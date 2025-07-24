'use client';

import { formatDate } from '@/api/date';
import * as S from '@/styles/posts/posts';
import { PostData, PostListData } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  posts: PostData[] | PostListData[];
  categories: string[];
  currentCategory?: string; // 현재 선택된 카테고리 (All 포함)
}

export default function PostList({
  posts,
  categories,
  currentCategory = 'All',
}: Props) {
  return (
    <S.Wrapper>
      {/* <S.TempHeader /> */}
      <S.Title>POSTS</S.Title>
      <S.Categories>
        <Link href={`/posts`}>
          <S.Category
            className={currentCategory === 'All' ? 'clicked' : 'notClicked'}
          >
            All
          </S.Category>
        </Link>
        {categories.map((category, idx) => (
          <Link href={`/posts/${category}`} key={idx}>
            <S.Category
              className={
                currentCategory === category ? 'clicked' : 'notClicked'
              }
            >
              {category}
            </S.Category>
          </Link>
        ))}
      </S.Categories>
      {posts.map((post, idx) => (
        <Link href={`/posts/${post.category}/${post.slug}`} key={idx}>
          <S.Container>
            <S.Img>
              <Image
                src={post.coverImage}
                alt="이미지 불러오기 오류"
                width={124}
                height={124}
                style={{
                  marginRight: 40,
                  borderRadius: 10,
                }}
              />
            </S.Img>
            <div style={{ flex: 1 }}>
              <S.PostTitle>
                <S.PostTitleText>{post.title}</S.PostTitleText>
                <S.PostDate>{formatDate(post.date)}</S.PostDate>
              </S.PostTitle>

              <S.PostExcerpt>{post.excerpt}</S.PostExcerpt>
            </div>
          </S.Container>
        </Link>
      ))}
    </S.Wrapper>
  );
}
