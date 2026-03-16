'use client';

import { formatDate } from '@/api/date';
import { Footer } from '@/components/Footer';
import * as S from '@/styles/posts/category';
import { PostListData } from '@/types/types';
import Link from 'next/link';

interface Props {
  post: PostListData;
  children: React.ReactNode;
  prevPost: PostListData | null;
  nextPost: PostListData | null;
}

export default function PostDetail({
  post,
  children,
  prevPost,
  nextPost,
}: Props) {
  const { category, title, date } = post;

  return (
    <S.Wrapper>
      <Link href={`/posts/${category}`}>
        <S.PostCategory>#{category}</S.PostCategory>
      </Link>
      <S.Title>{title}</S.Title>
      <S.PostDate>{formatDate(date)}</S.PostDate>
      <S.PostLine />
      {children}
      <Footer prevPost={prevPost} nextPost={nextPost} />
      {/* <Comments postId={slug} /> */}
    </S.Wrapper>
  );
}
