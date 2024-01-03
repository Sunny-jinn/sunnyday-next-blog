import markdownToHtml, { getAllPosts, getPostBySlug } from '@/api/api';
import PostType from '@/interfaces/post';
import hljs from 'highlight.js';
import 'highlight.js/styles/arta.css';
import { useEffect } from 'react';

import * as S from './styled';
import { formatDate } from '@/api/date';
import Link from 'next/link';

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <S.Wrapper>
      <Link href={`/posts/${post.category}`}>
        <S.PostCategory>#{post.category}</S.PostCategory>
      </Link>
      <S.Title>{post.title}</S.Title>
      <S.PostDate>{formatDate(post.date)}</S.PostDate>
      <S.PostLine />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </S.Wrapper>
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
    'category',
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
  const posts = getAllPosts(['category', 'slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          category: post.category,
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
