/** 한 곳에서 조정하는 정책 상수들. */
export const LIMITS = {
  nickname: { min: 1, max: 20 },
  body: { min: 2, max: 500 },
  password: { min: 4, max: 64 },

  /** 본문에 허용하는 URL 최대 개수 */
  maxUrls: 1,

  /** 같은 IP 전체 기준 */
  perIp: [
    { windowMinutes: 10, max: 3 },
    { windowMinutes: 60 * 24, max: 10 },
  ],
  /** 같은 IP + 같은 글 기준 */
  perIpPerPost: { windowMinutes: 5, max: 1 },

  /** 동일 본문 재등록 차단 구간 */
  duplicateBodyMinutes: 60,

  /** 삭제 비밀번호 시도 */
  delete: { maxAttempts: 5, lockMinutes: 60 },

  /** rate_limits 보관 기간 */
  rateLimitRetentionDays: 7,
} as const;

export const RESERVED_NICKNAMES = [
  'admin',
  'administrator',
  'root',
  '관리자',
  '운영자',
];

export const OWNER_NICKNAME = process.env.OWNER_NICKNAME ?? 'sunny';
