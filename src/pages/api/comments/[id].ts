import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteComment } from '@/lib/comments/comments';
import { getClientIp } from '@/lib/comments/ip';
import { verifyTurnstile } from '@/lib/comments/turnstile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const id = Number(req.query.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: '잘못된 요청입니다.' });
    }

    const body = (req.body ?? {}) as Record<string, unknown>;
    const password = body.password;
    if (typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({ message: '비밀번호를 입력해 주세요.' });
    }

    const ip = getClientIp(req);
    if (!(await verifyTurnstile(body.turnstileToken, ip))) {
      return res.status(403).json({ message: '봇 확인에 실패했습니다. 다시 시도해 주세요.' });
    }

    const result = await deleteComment(id, password);
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[comments:delete]', error);
    return res.status(500).json({ message: '잠시 후 다시 시도해 주세요.' });
  }
}
