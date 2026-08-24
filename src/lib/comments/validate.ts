import slugs from '@/generated/slugs.json';
import { LIMITS, OWNER_NICKNAME, RESERVED_NICKNAMES } from './config';

/**
 * 전각/제로폭/소프트하이픈을 제거해 눈으로 구분되지 않는 사칭을 막는다.
 * "Sunny", "sunny ", "ｓunny" 가 모두 같은 값이 되어야 한다.
 */
export function normalizeNickname(raw: string): string {
  return raw
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function isReservedNickname(nickname: string): boolean {
  const key = normalizeNickname(nickname).toLowerCase();
  return (
    key === normalizeNickname(OWNER_NICKNAME).toLowerCase() ||
    RESERVED_NICKNAMES.includes(key)
  );
}

export function isKnownSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && (slugs as string[]).includes(slug);
}

export function countUrls(body: string): number {
  return (body.match(/https?:\/\//gi) ?? []).length;
}

export type ValidationError = { status: number; message: string };

export function validateNewComment(input: {
  nickname: unknown;
  body: unknown;
  password: unknown;
}): ValidationError | null {
  const { nickname, body, password } = input;

  if (typeof nickname !== 'string' || typeof body !== 'string' || typeof password !== 'string') {
    return { status: 400, message: '입력값이 올바르지 않습니다.' };
  }

  const nick = normalizeNickname(nickname);
  if (nick.length < LIMITS.nickname.min || nick.length > LIMITS.nickname.max) {
    return {
      status: 400,
      message: `닉네임은 ${LIMITS.nickname.min}~${LIMITS.nickname.max}자로 입력해 주세요.`,
    };
  }

  const trimmed = body.trim();
  if (trimmed.length < LIMITS.body.min || trimmed.length > LIMITS.body.max) {
    return {
      status: 400,
      message: `댓글은 ${LIMITS.body.min}~${LIMITS.body.max}자로 입력해 주세요.`,
    };
  }

  if (password.length < LIMITS.password.min || password.length > LIMITS.password.max) {
    return {
      status: 400,
      message: `비밀번호는 ${LIMITS.password.min}자 이상 입력해 주세요.`,
    };
  }

  if (countUrls(trimmed) > LIMITS.maxUrls) {
    return { status: 400, message: '링크는 한 개까지만 넣을 수 있습니다.' };
  }

  return null;
}
