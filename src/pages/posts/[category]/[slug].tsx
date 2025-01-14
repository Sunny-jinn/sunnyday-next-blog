import { getAllPosts, getPost } from '@/api/api';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect } from 'react';

import * as S from '../../../styles/posts/category';
import { formatDate } from '@/api/date';
import Link from 'next/link';

import { MDXRemote } from 'next-mdx-remote';
import { PostData } from '@/types/types';
import { NextSeo } from 'next-seo';
import { PostImage } from '@/components/PostImage';
import { PostImageList } from '@/components/PostImageList';
import { Footer } from '@/components/Footer';
import { Comments } from '@/components/Comments';
type Props = {
  content: string;
  frontMatter: PostData;
  mdxSource: any;
  prevPost: PostData;
  nextPost: PostData;
};

const Post = ({
  content,
  frontMatter: { category, title, date, slug, excerpt },
  mdxSource,
  prevPost,
  nextPost,
}: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  const components = { PostImage, PostImageList };

  return (
    <>
      <NextSeo
        title={`${title}`}
        description={`${excerpt}`}
        openGraph={{
          type: 'website',
          url: `https://itssunny.day/posts/${category}/${slug}`,
          title: `${title}`,
          description: `${excerpt}`,
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
        <Footer prevPost={prevPost} nextPost={nextPost} />
        <Comments />
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
  const allPosts = getAllPosts(['title', 'slug', 'category', 'date']);

  const currentIndex = allPosts.findIndex(post => post.slug === params.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null; // 이전 글
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null; // 다음 글

  return {
    props: {
      mdxSource,
      frontMatter: data,
      content,
      prevPost,
      nextPost,
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
