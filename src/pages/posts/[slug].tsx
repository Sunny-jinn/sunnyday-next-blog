import markdownToHtml, { getAllPosts, getPostBySlug } from '@/api/api';
import PostType from '@/interfaces/post';
import hljs from 'highlight.js';
import 'highlight.js/styles/arta.css';
import { useEffect } from 'react';

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

const Post = ({ post, morePosts, preview }: Props) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div>{post.slug}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
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
