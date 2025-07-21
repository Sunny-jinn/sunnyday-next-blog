import { getAllPosts, getPostsByCategory } from '@/api/api';
import { PostListData } from '@/types/types';
import PostList from '@/components/Post/PostList'; // UI 컴포넌트 import
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = params.category;
  return {
    title: `Sunny의 ${category}`,
    description: `Sunny의 ${category}글 보기`,
    openGraph: {
      type: 'website',
      url: `/posts/${category}`,
      title: `Sunny's ${category} posts`,
      description: `Sunny의 ${category}글 보기`,
      images: [
        {
          url: '/assets/ogImage.png',
          width: 285,
          height: 167,
        },
      ],
    },
  };
}

async function getData(category: string) {
  const posts = getPostsByCategory(category, [
    'slug',
    'title',
    'date',
    'excerpt',
    'coverImage',
    'category',
  ]) as PostListData[];
  const categoriesSet = new Set(
    getAllPosts(['category']).map(post => post.category),
  );
  const categories = Array.from(categoriesSet);
  return { posts, categories };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const { posts, categories } = await getData(category);

  return (
    <PostList
      posts={posts}
      categories={categories}
      currentCategory={category}
    />
  );
}
