import { getAllPosts, getPost } from '@/api/api';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect } from 'react';

import * as S from '../../../styles/posts/category';
import { formatDate } from '@/api/date';
import Link from 'next/link';

import { MDXRemote } from 'next-mdx-remote';
import { PostData } from '@/types/types';
import { NextSeo } from 'next-seo';
import { PostImage } from '@/components/PostImage';
import { PostImageList } from '@/components/PostImageList';
type Props = {
  content: string;
  frontMatter: PostData;
  mdxSource: any;
};

const Post = ({
  content,
  frontMatter: { category, title, date, slug, description },
  mdxSource,
}: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const components = { PostImage, PostImageList };

  return (
    <>
      <NextSeo
        title={`${title}`}
        description={`${description}`}
        openGraph={{
          type: 'website',
          url: `https://itssunny.day/posts/${category}/${slug}`,
          title: `${title}`,
          description: `${description}`,
          images: [
            {
              url: 'https://itssunny.day/assets/ogImage.png',
              width: 285,
              height: 167,
            },
          ],
        }}
      />
      <S.Wrapper>
        <S.TempHeader />
        <Link href={`/posts/${category}`}>
          <S.PostCategory>#{category}</S.PostCategory>
        </Link>
        <S.Title>{title}</S.Title>
        <S.PostDate>{formatDate(date)}</S.PostDate>
        <S.PostLine />
        <MDXRemote {...mdxSource} components={components} />
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
