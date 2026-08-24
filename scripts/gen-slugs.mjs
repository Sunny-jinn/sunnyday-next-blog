// 빌드/개발 시작 전에 _posts 의 slug 목록을 정적 JSON 으로 뽑는다.
//
// API Route 에서 fs.readdirSync('_posts') 를 하면 Vercel 서버리스 번들에
// mdx 파일이 포함되지 않아 런타임에 터진다. 그래서 빌드 타임에 목록을 만들어
// import 로 읽는다.
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = join(root, '_posts');
const outFile = join(root, 'src', 'generated', 'slugs.json');

// draft 글도 포함한다. 프로덕션에서는 해당 페이지 자체가 생성되지 않아
// 폼에 접근할 수 없고, 굳이 걸러내면 로컬에서 초안을 미리볼 때 댓글이 막힌다.
const slugs = readdirSync(postsDir)
  .filter(file => /\.mdx?$/.test(file))
  .map(file => file.replace(/\.mdx?$/, ''))
  .sort();

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(slugs, null, 2)}\n`, 'utf8');

console.log(`[gen-slugs] ${slugs.length} slugs -> src/generated/slugs.json`);
