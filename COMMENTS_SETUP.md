# 댓글 시스템 셋업

이 브랜치(`feat/comments-system`)에는 댓글 시스템 코드가 들어 있습니다.
**동작시키려면 아래 계정/키 발급이 필요합니다.** 코드로는 대신 할 수 없는 부분입니다.

---

## 1. Turso (댓글 저장소)

카드 등록 없이 무료입니다.

1. https://turso.tech 가입 (GitHub 로그인)
2. CLI 설치 후 DB 생성

```bash
brew install tursodatabase/tap/turso
turso auth login
turso db create sunnyday-comments

# 스키마 적용
turso db shell sunnyday-comments < src/lib/comments/schema.sql

# 접속 정보 확인
turso db show sunnyday-comments --url      # → TURSO_DATABASE_URL
turso db tokens create sunnyday-comments   # → TURSO_AUTH_TOKEN
```

## 2. Cloudflare Turnstile (봇 차단)

무료입니다. 도메인이 Cloudflare에 없어도 됩니다.

1. https://dash.cloudflare.com 가입
2. 좌측 메뉴 **Turnstile** → **Add widget**
3. 도메인에 `itssunny.day` 와 `localhost` 추가
4. 위젯 모드는 **Managed** 또는 **Invisible**
5. **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   **Secret Key** → `TURNSTILE_SECRET_KEY`

> 로컬 개발은 이 단계 없이도 됩니다. 아래 더미 키를 쓰면 항상 통과합니다.

## 3. 직접 정하는 값

```bash
# IP 해싱용 솔트 (한 번 정하면 바꾸지 말 것 — 바꾸면 기존 레이트리밋 기록이 무효화됨)
openssl rand -hex 32
```

- `ADMIN_PASSWORD` — 아무 강한 문자열. 이걸로 예약 닉네임(`sunny`) 사용 + 모든 댓글 삭제
- `IP_HASH_SALT` — 위 명령 결과
- `OWNER_NICKNAME` — 기본 `sunny`

## 4. Discord 웹훅 (선택)

새 댓글 알림을 받고 싶으면. 서버에서만 호출하므로 안전합니다.

디스코드 채널 → 설정 → 연동 → 웹후크 → URL 복사 → `DISCORD_WEBHOOK_URL`

## 5. 환경변수 등록

### 로컬 — `.env.local` 생성 (`.env.example` 참고)

```bash
# 더미 키로 바로 개발 시작 가능
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000BB
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
ADMIN_PASSWORD=...
IP_HASH_SALT=...
OWNER_NICKNAME=sunny
```

### Vercel — 프로젝트 Settings → Environment Variables

위 값들을 **실제 키로** 등록. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 만 공개이고
나머지는 절대 `NEXT_PUBLIC_` 접두사를 붙이면 안 됩니다.

프로덕션에서 `TURNSTILE_SECRET_KEY` 가 비어 있으면 **댓글 작성이 전부 거부**됩니다
(fail closed). 의도된 동작입니다.

### 기존 giscus 환경변수 삭제

Vercel 설정에서 아래를 지우세요. 코드에서는 이미 제거했습니다.

```
NEXT_PUBLIC_GITHUB_REPO
NEXT_PUBLIC_GITHUB_REPO_ID
NEXT_PUBLIC_GITHUB_CATEGORY
NEXT_PUBLIC_GITHUB_CATEGORY_ID
```

---

## 6. 동작 확인

```bash
npm install
npm run dev
```

`http://localhost:3000/posts/CODING/coding_3` 에서:

- [ ] 댓글 작성 → 목록에 뜸
- [ ] 답글 작성 → 들여쓰기되어 붙음
- [ ] 답글의 "답글" 클릭 → `@닉네임 ` 프리필, 등록해도 2단계로 안 내려감
- [ ] 닉네임 `sunny` + 아무 비번 → 403
- [ ] 닉네임 `sunny` + `ADMIN_PASSWORD` → "글쓴이" 뱃지
- [ ] 비번 맞게 입력 → 삭제됨
- [ ] 비번 5회 틀림 → 잠금
- [ ] 답글 있는 댓글 삭제 → "삭제된 댓글입니다" 로 남음
- [ ] 같은 글에 5분 내 두 번째 댓글 → 429

---

## 남은 작업 (초안 상태)

- 스타일이 기본값입니다. 블로그 톤에 맞게 `src/components/Comments/styled.ts` 조정
- 실제 DB 연결 테스트는 안 되어 있습니다 (Turso 계정이 없어서 빌드 검증만 함)
- `_posts` 파일명 리네임 (`coding_1` → 내용 기반 kebab-case)은 별도 작업

## Obsidian (선택, 댓글과 무관)

1. https://obsidian.md 설치
2. Vault 를 **레포 루트**로 지정 (`_posts` 아님 — `.obsidian/` 이 `_posts` 를 오염시킴)
3. `.gitignore` 에 `.obsidian/` 추가
4. 설정 → 파일 및 링크 → 첨부 파일 기본 위치를 `public/assets/posts` 로

이제 마크다운 이미지(`![](...)`)가 `PostImage` 컴포넌트로 렌더되므로
Obsidian 에서 이미지 미리보기가 됩니다.
