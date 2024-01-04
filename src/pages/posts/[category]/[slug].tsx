import { getAllPosts, getPost } from '@/api/api';
import hljs from 'highlight.js';
import 'highlight.js/styles/arta.css';
import { useEffect } from 'react';

import * as S from '../../../styles/posts/category';
import { formatDate } from '@/api/date';
import Link from 'next/link';

import { MDXRemote } from 'next-mdx-remote';
import { PostData } from '@/types/types';
import { NextSeo } from 'next-seo';

type Props = {
  content: string;
  frontMatter: PostData;
  mdxSource: any;
};

const Post = ({
  content,
  frontMatter: { category, title, date },
  mdxSource,
}: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <NextSeo
        title={`${title}`}
        description={`Sunny의 ${category}글 보기`}
        openGraph={{
          type: 'website',
          url: '',
          title: '',
          description: '',
          images: [
            {
              url: '',
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <S.Wrapper>
        <Link href={`/posts/${category}`}>
          <S.PostCategory>#{category}</S.PostCategory>
        </Link>
        <S.Title>{title}</S.Title>
        <S.PostDate>{formatDate(date)}</S.PostDate>
        <S.PostLine />
        <MDXRemote {...mdxSource} />
      </S.Wrapper>
    </>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { mdxSource, data, content } = await getPost(params.slug);
  return {
    props: {
      mdxSource,
      frontMatter: data,
      content,
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
