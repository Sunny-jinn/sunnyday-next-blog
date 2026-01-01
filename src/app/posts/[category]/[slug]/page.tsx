import { getAllPosts, getPost } from '@/api/api';
import PostDetail from '@/components/Post/PostDetail';
import { PostListData } from '@/types/types';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getPost(slug);
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
  const { mdxSource, data } = await getPost(slug);
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const { mdxSource, data, prevPost, nextPost } = await getData(slug);
  return (
    <PostDetail
      post={data}
      mdxSource={mdxSource}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}