import { getAllPosts } from '@/api/api';
import { PostData } from '@/types/types';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/api/date';

import * as S from './styled';

const Posts: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <S.Wrapper>
      <S.Title>POSTS</S.Title>

      {posts.map((post, idx) => (
        <Link href={`/posts/${post.slug}`} key={idx}>
          <S.Container>
            <S.Img>
              <Image
                src={post.ogImage.url}
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
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = () => {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'excerpt',
    'ogImage',
    'category',
  ]);
  return { props: { posts } };
};
