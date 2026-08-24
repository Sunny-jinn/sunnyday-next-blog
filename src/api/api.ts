import fs from 'fs';
import path, { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const postsDirectory = join(process.cwd(), '_posts');

const MDX_FILE = /\.mdx?$/;

export const postFilePaths = fs
  .readdirSync(postsDirectory)
  .filter(file => MDX_FILE.test(file));

/**
 * `_posts` 안에는 mdx 가 아닌 것들이 섞일 수 있다.
 * (.DS_Store, Obsidian 의 .obsidian/, 이미지, 초안 텍스트 등)
 * 필터가 없으면 존재하지 않는 `<name>.mdx` 를 읽다가 빌드가 죽는다.
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => MDX_FILE.test(file));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(MDX_FILE, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: any;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export const getPost = async (slug: string) => {
  const postFilePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkToc, remarkGfm],
      // 빌드 타임에 하이라이팅한다. 클라이언트에서 hljs 를 돌리지 않는다.
      // detect: true 는 기존 hljs.highlightAll() 과 동일하게, 언어 표기가 없는
      // 코드펜스도 추론해서 하이라이팅한다. 끄면 ``` 만 쓴 블록이 밋밋해진다.
      rehypePlugins: [[rehypeHighlight, { detect: true }]],
    },
  });
  return { mdxSource, data, content };
};

/**
 * `draft: true` 인 글은 개발 환경에서만 보인다.
 * 프로덕션 빌드에서는 목록에서도 빠지고 정적 페이지도 생성되지 않는다.
 */
const isVisible = (post: { draft?: boolean }) =>
  process.env.NODE_ENV === 'development' || post.draft !== true;

const withDraftFlag = (fields: string[]) =>
  fields.includes('draft') ? fields : [...fields, 'draft'];

const byDateDesc = (post1: any, post2: any) => (post1.date > post2.date ? -1 : 1);

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, withDraftFlag(fields)))
    .filter(isVisible)
    .sort(byDateDesc);
  return posts;
}

export function getPostsByCategory(category: string, fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, withDraftFlag(fields)))
    .filter(isVisible)
    .filter(post => post.category === category)
    .sort(byDateDesc);

  return posts;
}
