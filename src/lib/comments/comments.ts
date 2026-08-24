import { timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';

import { getDb } from './db';
import { LIMITS } from './config';
import type { CommentNode } from './types';

/** SQLite datetime('now') 은 UTC 문자열이라 ISO 로 바꿔서 내보낸다. */
const toIso = (value: unknown): string => {
  const raw = String(value ?? '').replace(' ', 'T');
  return raw.endsWith('Z') ? raw : `${raw}Z`;
};

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function isAdminPassword(password: string): boolean {
  const admin = process.env.ADMIN_PASSWORD;
  if (!admin) return false;
  return safeEqual(password, admin);
}

export async function listComments(postSlug: string): Promise<CommentNode[]> {
  const db = getDb();
  const res = await db.execute({
    sql: `SELECT id, parent_id, nickname, body, is_owner, deleted_at, created_at
          FROM comments
          WHERE post_slug = ? AND approved = 1
          ORDER BY created_at ASC, id ASC`,
    args: [postSlug],
  });

  const byId = new Map<number, CommentNode>();
  const roots: CommentNode[] = [];

  for (const row of res.rows) {
    const deleted = row.deleted_at !== null;
    byId.set(Number(row.id), {
      id: Number(row.id),
      // 삭제된 댓글은 닉네임과 본문을 내보내지 않는다.
      nickname: deleted ? '' : String(row.nickname),
      body: deleted ? '' : String(row.body),
      isOwner: Number(row.is_owner) === 1,
      deleted,
      createdAt: toIso(row.created_at),
      parentId: row.parent_id === null ? null : Number(row.parent_id),
      replies: [],
    });
  }

  for (const node of Array.from(byId.values())) {
    if (node.parentId === null) {
      roots.push(node);
      continue;
    }
    const parent = byId.get(node.parentId);
    if (parent) parent.replies.push(node);
    else roots.push(node);
  }

  return roots;
}

export type ParentCheck =
  | { ok: true }
  | { ok: false; status: number; message: string };

export async function checkParent(
  parentId: number,
  postSlug: string,
): Promise<ParentCheck> {
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT parent_id, post_slug, deleted_at FROM comments WHERE id = ? LIMIT 1',
    args: [parentId],
  });

  const row = res.rows[0];
  if (!row) return { ok: false, status: 404, message: '원 댓글을 찾을 수 없습니다.' };
  if (row.parent_id !== null) {
    return { ok: false, status: 400, message: '답글에는 답글을 달 수 없습니다.' };
  }
  if (row.post_slug !== postSlug) {
    return { ok: false, status: 400, message: '잘못된 요청입니다.' };
  }
  if (row.deleted_at !== null) {
    return { ok: false, status: 400, message: '삭제된 댓글에는 답글을 달 수 없습니다.' };
  }
  return { ok: true };
}

export async function createComment(input: {
  postSlug: string;
  parentId: number | null;
  nickname: string;
  body: string;
  password: string;
  bodyHash: string;
  isOwner: boolean;
}): Promise<number> {
  const db = getDb();
  const passwordHash = await bcrypt.hash(input.password, 10);

  const res = await db.execute({
    sql: `INSERT INTO comments
            (post_slug, parent_id, nickname, body, body_hash, password_hash, is_owner)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          RETURNING id`,
    args: [
      input.postSlug,
      input.parentId,
      input.nickname,
      input.body,
      input.bodyHash,
      passwordHash,
      input.isOwner ? 1 : 0,
    ],
  });

  return Number(res.rows[0].id);
}

export type DeleteResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

export async function deleteComment(
  id: number,
  password: string,
): Promise<DeleteResult> {
  const db = getDb();

  const found = await db.execute({
    sql: `SELECT id, parent_id, password_hash, failed_deletes, locked_until
          FROM comments WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
    args: [id],
  });
  const row = found.rows[0];
  if (!row) return { ok: false, status: 404, message: '댓글을 찾을 수 없습니다.' };

  const lockedUntil = row.locked_until ? new Date(`${String(row.locked_until).replace(' ', 'T')}Z`) : null;
  if (lockedUntil && lockedUntil.getTime() > Date.now()) {
    return {
      ok: false,
      status: 429,
      message: '비밀번호를 여러 번 틀렸습니다. 잠시 후 다시 시도해 주세요.',
    };
  }

  const matched =
    isAdminPassword(password) ||
    (await bcrypt.compare(password, String(row.password_hash)));

  if (!matched) {
    const failed = Number(row.failed_deletes) + 1;
    if (failed >= LIMITS.delete.maxAttempts) {
      await db.execute({
        sql: `UPDATE comments
              SET failed_deletes = ?, locked_until = datetime('now', '+${LIMITS.delete.lockMinutes} minutes')
              WHERE id = ?`,
        args: [failed, id],
      });
    } else {
      await db.execute({
        sql: 'UPDATE comments SET failed_deletes = ? WHERE id = ?',
        args: [failed, id],
      });
    }
    return { ok: false, status: 403, message: '비밀번호가 일치하지 않습니다.' };
  }

  const children = await db.execute({
    sql: 'SELECT COUNT(*) AS c FROM comments WHERE parent_id = ?',
    args: [id],
  });

  if (Number(children.rows[0].c) > 0) {
    // 답글이 남아 있으면 자리만 남긴다. 해시도 지운다.
    await db.execute({
      sql: `UPDATE comments
            SET deleted_at = datetime('now'),
                body = '', nickname = '', password_hash = '',
                failed_deletes = 0, locked_until = NULL
            WHERE id = ?`,
      args: [id],
    });
    return { ok: true };
  }

  const parentId = row.parent_id === null ? null : Number(row.parent_id);
  await db.execute({ sql: 'DELETE FROM comments WHERE id = ?', args: [id] });

  // 마지막 답글이 사라졌고 부모가 이미 삭제 상태면 부모도 완전히 지운다.
  if (parentId !== null) {
    const parent = await db.execute({
      sql: 'SELECT deleted_at FROM comments WHERE id = ? LIMIT 1',
      args: [parentId],
    });
    if (parent.rows[0] && parent.rows[0].deleted_at !== null) {
      const remaining = await db.execute({
        sql: 'SELECT COUNT(*) AS c FROM comments WHERE parent_id = ?',
        args: [parentId],
      });
      if (Number(remaining.rows[0].c) === 0) {
        await db.execute({
          sql: 'DELETE FROM comments WHERE id = ?',
          args: [parentId],
        });
      }
    }
  }

  return { ok: true };
}
