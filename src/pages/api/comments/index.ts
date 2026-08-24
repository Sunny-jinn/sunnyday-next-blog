import type { NextApiRequest, NextApiResponse } from 'next';

import { checkParent, createComment, listComments } from '@/lib/comments/comments';
import { getClientIp, hashBody, hashIp } from '@/lib/comments/ip';
import { notifyNewComment } from '@/lib/comments/notify';
import {
  checkRateLimit,
  isBlocked,
  isDuplicateBody,
  purgeOldRateLimits,
  recordAttempt,
} from '@/lib/comments/rateLimit';
import { verifyTurnstile } from '@/lib/comments/turnstile';
import {
  isKnownSlug,
  isReservedNickname,
  normalizeNickname,
  validateNewComment,
} from '@/lib/comments/validate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') return await handleGet(req, res);
    if (req.method === 'POST') return await handlePost(req, res);

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('[comments]', error);
    return res.status(500).json({ message: '잠시 후 다시 시도해 주세요.' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (!isKnownSlug(slug)) {
    return res.status(404).json({ message: '존재하지 않는 글입니다.' });
  }

  const comments = await listComments(slug);
  return res.status(200).json({ comments });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>;

  // 허니팟. CSS 로 숨긴 필드라 사람이 채울 일이 없다.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(403).json({ message: '요청을 처리할 수 없습니다.' });
  }

  if (!isKnownSlug(body.slug)) {
    return res.status(404).json({ message: '존재하지 않는 글입니다.' });
  }
  const slug = body.slug;

  const invalid = validateNewComment({
    nickname: body.nickname,
    body: body.body,
    password: body.password,
  });
  if (invalid) return res.status(invalid.status).json({ message: invalid.message });

  const nickname = normalizeNickname(body.nickname as string);
  const password = body.password as string;
  const text = (body.body as string).trim();

  const ip = getClientIp(req);

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return res.status(403).json({ message: '봇 확인에 실패했습니다. 다시 시도해 주세요.' });
  }

  // 예약 닉네임은 관리자 비밀번호가 맞을 때만 허용한다.
  let isOwner = false;
  if (isReservedNickname(nickname)) {
    const { isAdminPassword } = await import('@/lib/comments/comments');
    if (!isAdminPassword(password)) {
      return res.status(403).json({ message: '사용할 수 없는 닉네임입니다.' });
    }
    isOwner = true;
  }

  const ipHash = hashIp(ip);
  if (await isBlocked(ipHash)) {
    return res.status(403).json({ message: '요청을 처리할 수 없습니다.' });
  }

  const limited = await checkRateLimit(ipHash, slug);
  if (limited) return res.status(429).json({ message: limited });

  const bodyHash = hashBody(text);
  if (await isDuplicateBody(slug, bodyHash)) {
    return res.status(409).json({ message: '방금 남긴 댓글과 같은 내용입니다.' });
  }

  let parentId: number | null = null;
  if (body.parentId !== null && body.parentId !== undefined) {
    parentId = Number(body.parentId);
    if (!Number.isInteger(parentId)) {
      return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
    const parent = await checkParent(parentId, slug);
    if (!parent.ok) {
      return res.status(parent.status).json({ message: parent.message });
    }
  }

  const id = await createComment({
    postSlug: slug,
    parentId,
    nickname,
    body: text,
    password,
    bodyHash,
    isOwner,
  });

  await recordAttempt(ipHash, slug);
  await purgeOldRateLimits();
  await notifyNewComment({
    slug,
    nickname,
    body: text,
    isReply: parentId !== null,
  });

  return res.status(201).json({ id });
}
