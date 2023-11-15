---
title: 'Learn How to Pre-render Pages Using Static Generation with Next.js'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Tim Neutkens
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

zz

## HI

## ~안녕하세요~

---

# TEst

hydration error

```
import markdownToHtml, { getAllPosts, getPostBySlug } from '@/api/api';
import PostType from '@/interfaces/post';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { useEffect } from 'react';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Post = ({ post, morePosts, preview }: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div>{post.slug}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

```
