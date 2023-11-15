import markdownToHtml, { getAllPosts, getPostBySlug } from '@/api/api';
import Layout from '@/components/Layout';
import PostType from '@/interfaces/post';
import styled from '@emotion/styled';
import hljs from 'highlight.js';
import 'highlight.js/styles/arta.css';
import { useEffect } from 'react';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const TestWrapper = styled.div`
  font-weight: 700;
  color: #de1d1dff;
`;

const Post = ({ post, morePosts, preview }: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Layout>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <TestWrapper>{post.slug}</TestWrapper>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  );
};

export default Post;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);

  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
