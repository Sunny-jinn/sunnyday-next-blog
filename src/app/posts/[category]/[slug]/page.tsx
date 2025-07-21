import { getAllPosts, getPost } from '@/api/api';
import PostDetail from '@/components/Post/PostDetail'; // UI 컴포넌트 import
import { PostListData } from '@/types/types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await getPost(params.slug);
  return {
    title: data.title,
    description: data.excerpt,
    openGraph: {
      type: 'article',
      url: `/posts/${data.category}/${data.slug}`,
      title: data.title,
      description: data.excerpt,
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

type PostDetailData = Omit<PostListData, 'category' | 'coverImage'>;

async function getData(slug: string) {
  const { mdxSource, data, content } = await getPost(slug);
  const allPosts = getAllPosts([
    'title',
    'slug',
    'category',
    'date',
  ]) as PostDetailData[];

  const currentIndex = allPosts.findIndex(post => post.slug === slug);
  const nextPost =
    currentIndex > 0 ? (allPosts[currentIndex - 1] as PostListData) : null;
  const prevPost =
    currentIndex < allPosts.length - 1
      ? (allPosts[currentIndex + 1] as PostListData)
      : null;

  return { mdxSource, data: data as PostListData, prevPost, nextPost };
}

// 서버 컴포넌트는 데이터 페칭만 담당합니다.
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { mdxSource, data, prevPost, nextPost } = await getData(params.slug);

  // 데이터는 클라이언트 컴포넌트에 props로 전달합니다.
  return (
    <PostDetail
      post={data}
      mdxSource={mdxSource}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}
