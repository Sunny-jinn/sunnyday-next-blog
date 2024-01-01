import { getAllPosts } from '@/api/api';
import { PostData } from '@/types/types';
import { NextPage } from 'next';

import * as S from './styled';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/api/date';

const Posts: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <S.Wrapper>
      {posts.map((post, idx) => (
        <Link href={`/posts/${post.slug}`} key={idx}>
          <S.Container>
            <Image
              src={post.ogImage.url}
              alt="이미지 불러오기 오류"
              width={120}
              height={120}
              style={{
                marginRight: 40,
              }}
            />
            <div>
              <S.PostTitle>
                {post.title}
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

export const getStaticProps = () => {
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
