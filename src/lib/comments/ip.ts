import { createHash } from 'node:crypto';
import type { NextApiRequest } from 'next';

/**
 * 원본 IP 는 저장하지 않는다.
 * IPv4 는 마지막 옥텟을, IPv6 는 뒤쪽을 잘라내 식별력을 낮춘 뒤 해싱한다.
 */
export function maskIp(ip: string): string {
  if (ip.includes(':')) {
    return `${ip.split(':').slice(0, 3).join(':')}::`;
  }
  const parts = ip.split('.');
  if (parts.length !== 4) return ip;
  return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
}

export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (raw) return raw.split(',')[0].trim();
  return req.socket.remoteAddress ?? '0.0.0.0';
}

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(`${salt}:${maskIp(ip)}`).digest('hex');
}

export function hashBody(body: string): string {
  return createHash('sha256').update(body.trim()).digest('hex');
}
