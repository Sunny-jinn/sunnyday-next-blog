'use client';

import { formatDate } from '@/api/date';
import { Comments } from '@/components/Comments';
import { Footer } from '@/components/Footer';
import * as S from '@/styles/posts/category';
import { PostListData } from '@/types/types';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import PostContent from './PostContent';

interface Props {
  post: PostListData;
  mdxSource: MDXRemoteSerializeResult;
  prevPost: PostListData | null;
  nextPost: PostListData | null;
}

export default function PostDetail({
  post,
  mdxSource,
  prevPost,
  nextPost,
}: Props) {
  const { category, title, date, slug } = post;

  return (
    <S.Wrapper>
      <Link href={`/posts/${category}`}>
        <S.PostCategory>#{category}</S.PostCategory>
      </Link>
      <S.Title>{title}</S.Title>
      <S.PostDate>{formatDate(date)}</S.PostDate>
      <S.PostLine />
      <PostContent mdxSource={mdxSource} />
      <Footer prevPost={prevPost} nextPost={nextPost} />
      <Comments postId={slug} />
    </S.Wrapper>
  );
}
