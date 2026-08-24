-- Turso(libSQL) 스키마.
--   turso db shell <db-name> < src/lib/comments/schema.sql

CREATE TABLE IF NOT EXISTS comments (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug      TEXT    NOT NULL,
  parent_id      INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  nickname       TEXT    NOT NULL,
  body           TEXT    NOT NULL,
  body_hash      TEXT    NOT NULL,
  password_hash  TEXT    NOT NULL,
  is_owner       INTEGER NOT NULL DEFAULT 0,
  approved       INTEGER NOT NULL DEFAULT 1,
  deleted_at     TEXT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  failed_deletes INTEGER NOT NULL DEFAULT 0,
  locked_until   TEXT
);

CREATE INDEX IF NOT EXISTS idx_comments_post   ON comments(post_slug, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

-- 레이트 리밋 전용. 댓글 본문과 IP 의 영구 연결을 만들지 않기 위해 분리한다.
-- 7일이 지난 행은 쓰기 시점에 같이 삭제된다.
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_hash    TEXT NOT NULL,
  post_slug  TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_rate_ip ON rate_limits(ip_hash, created_at);

CREATE TABLE IF NOT EXISTS blocked_ips (
  ip_hash    TEXT PRIMARY KEY,
  reason     TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
