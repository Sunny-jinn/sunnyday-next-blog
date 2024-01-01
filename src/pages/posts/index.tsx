import { getAllPosts } from '@/api/api';
import { PostData } from '@/types/types';
import { NextPage } from 'next';

import * as S from './styled';

const Posts: NextPage<{ posts: PostData[] }> = ({ posts }) => {
  console.log(posts);
  return (
    <S.Wrapper>
      {posts.map((post, idx) => (
        <S.Container key={idx}>
          <div>{post.title}</div>
          <div>{post.date}</div>
          <div>{post.excerpt}</div>
        </S.Container>
      ))}
    </S.Wrapper>
  );
};

export default Posts;

export const getStaticProps = () => {
  const posts = getAllPosts(['slug', 'title', 'date', 'excerpt']);
  return { props: { posts } };
};
