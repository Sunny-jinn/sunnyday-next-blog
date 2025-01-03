import fs from 'fs';
import path, { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
const postsDirectory = join(process.cwd(), '_posts');

export const postFilePaths = fs
  .readdirSync(postsDirectory)
  .filter(path => /\.mdx?$/.test(path));

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
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
    },
  });
  return { mdxSource, data, content };
};

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByCategory(category: string, fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    .filter(post => post.category === category) // 필터링: 특정 카테고리에 속한 포스트만 선택
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
