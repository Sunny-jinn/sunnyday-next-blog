import { getDb } from './db';
import { LIMITS } from './config';

const minutesAgo = (n: number) => `datetime('now', '-${n} minutes')`;

export async function isBlocked(ipHash: string): Promise<boolean> {
  const db = getDb();
  const res = await db.execute({
    sql: 'SELECT 1 FROM blocked_ips WHERE ip_hash = ? LIMIT 1',
    args: [ipHash],
  });
  return res.rows.length > 0;
}

/** 통과하면 null, 막히면 사용자에게 보여줄 메시지를 돌려준다. */
export async function checkRateLimit(
  ipHash: string,
  postSlug: string,
): Promise<string | null> {
  const db = getDb();

  for (const rule of LIMITS.perIp) {
    const res = await db.execute({
      sql: `SELECT COUNT(*) AS c FROM rate_limits
            WHERE ip_hash = ? AND created_at > ${minutesAgo(rule.windowMinutes)}`,
      args: [ipHash],
    });
    if (Number(res.rows[0].c) >= rule.max) {
      return '댓글을 너무 자주 남기고 있습니다. 잠시 후 다시 시도해 주세요.';
    }
  }

  const perPost = await db.execute({
    sql: `SELECT COUNT(*) AS c FROM rate_limits
          WHERE ip_hash = ? AND post_slug = ?
            AND created_at > ${minutesAgo(LIMITS.perIpPerPost.windowMinutes)}`,
    args: [ipHash, postSlug],
  });
  if (Number(perPost.rows[0].c) >= LIMITS.perIpPerPost.max) {
    return `같은 글에는 ${LIMITS.perIpPerPost.windowMinutes}분에 한 번만 남길 수 있습니다.`;
  }

  return null;
}

export async function isDuplicateBody(
  postSlug: string,
  bodyHash: string,
): Promise<boolean> {
  const db = getDb();
  const res = await db.execute({
    sql: `SELECT 1 FROM comments
          WHERE post_slug = ? AND body_hash = ? AND deleted_at IS NULL
            AND created_at > ${minutesAgo(LIMITS.duplicateBodyMinutes)}
          LIMIT 1`,
    args: [postSlug, bodyHash],
  });
  return res.rows.length > 0;
}

export async function recordAttempt(ipHash: string, postSlug: string): Promise<void> {
  const db = getDb();
  await db.execute({
    sql: 'INSERT INTO rate_limits (ip_hash, post_slug) VALUES (?, ?)',
    args: [ipHash, postSlug],
  });
}

/** 보관기간이 지난 기록을 지운다. 별도 cron 없이 쓰기 시점에 같이 돌린다. */
export async function purgeOldRateLimits(): Promise<void> {
  const db = getDb();
  await db.execute(
    `DELETE FROM rate_limits
     WHERE created_at < datetime('now', '-${LIMITS.rateLimitRetentionDays} days')`,
  );
}
