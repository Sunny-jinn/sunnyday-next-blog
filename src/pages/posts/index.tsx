import { getAllPosts } from '@/api/api';
import { PostData } from '@/types/types';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/api/date';

import * as S from '../../styles/posts/posts';
import { NextSeo } from 'next-seo';

const Posts: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <>
      <NextSeo
        title="Sunny's posts"
        description="Sunny의 모든 글 보기"
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
        <S.Title>POSTS</S.Title>
        <S.Categories>
          <Link href={`/posts`}>
            <S.Category className="clicked">All</S.Category>
          </Link>
          {categories.map((category, idx) => (
            <Link href={`/posts/${category}`} key={idx}>
              <S.Category className="notClicked">{category}</S.Category>
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
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'excerpt',
    'coverImage',
    'category',
  ]);
  return { props: { posts } };
};
