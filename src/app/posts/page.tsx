import { getAllPosts } from '@/api/api';
import { PostListData } from '@/types/types';
import PostList from '@/components/Post/PostList'; // UI 컴포넌트 import
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sunny's posts",
  description: 'Sunny의 모든 글 보기',
  openGraph: {
    type: 'website',
    url: '/posts',
    title: "Sunny's posts",
    description: 'Sunny의 모든 글 보기',
    images: [
      {
        url: '/assets/ogImage.png',
        width: 285,
        height: 167,
      },
    ],
  },
};

async function getData() {
  const posts = getAllPosts([
    'slug',
    'title',
    'date',
    'excerpt',
    'coverImage',
    'category',
  ]) as PostListData[]; // 타입을 명시적으로 지정
  const categorySet = [...new Set(posts.map(post => post.category))];
  const categories = Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  return { posts, categories };
}

// 서버 컴포넌트는 데이터 페칭만 담당합니다.
export default async function PostsPage() {
  const { posts, categories } = await getData();

  // 데이터는 클라이언트 컴포넌트에 props로 전달합니다.
  return (
    <PostList posts={posts} categories={categories} currentCategory="All" />
  );
}
