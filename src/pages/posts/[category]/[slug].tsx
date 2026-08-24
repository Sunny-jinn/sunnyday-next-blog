import { getAllPosts, getPost } from '@/api/api';
import 'highlight.js/styles/tokyo-night-dark.css';

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
  slug: string;
  frontMatter: PostData;
  mdxSource: any;
  prevPost: PostData;
  nextPost: PostData;
};

// 표준 마크다운 이미지도 PostImage 로 렌더한다.
// 덕분에 Obsidian 같은 일반 마크다운 에디터에서 이미지 미리보기가 되고,
// 캡션이나 크기 지정이 필요할 때만 <PostImage /> 를 직접 쓰면 된다.
const components = {
  PostImage,
  PostImageList,
  img: (props: { src?: string; alt?: string }) => (
    <PostImage src={props.src ?? ''} alt={props.alt ?? ''} />
  ),
};

const Post = ({
  slug,
  frontMatter: { category, title, date, excerpt },
  mdxSource,
  prevPost,
  nextPost,
}: Props) => {
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
        <Comments slug={slug} />
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
      slug: params.slug,
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
