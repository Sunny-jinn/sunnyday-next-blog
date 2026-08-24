import { createClient, type Client } from '@libsql/client';

let client: Client | null = null;

/**
 * 지연 초기화. 모듈 로드 시점에 환경변수를 요구하면 빌드가 깨지므로
 * 실제로 쿼리가 필요한 순간에만 만든다.
 */
export function getDb(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not set');
  }

  client = createClient({ url, authToken });
  return client;
}
