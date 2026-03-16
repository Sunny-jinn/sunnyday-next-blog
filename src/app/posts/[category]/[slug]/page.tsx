import { getAllPosts, getPost } from '@/api/api';
import PostContent from '@/components/Post/PostContent';
import PostDetail from '@/components/Post/PostDetail';
import PostMDXContent from '@/components/Post/PostMDXContent';
import { PostListData } from '@/types/types';
import { Metadata } from 'next';

export function generateStaticParams() {
  const posts = getAllPosts(['slug', 'category']);
  return posts.map(post => ({
    category: post.category as string,
    slug: post.slug as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data } = getPost(slug);
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

function getData(slug: string) {
  const { content, data } = getPost(slug);
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

  return { content, data: data as PostListData, prevPost, nextPost };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const { content, data, prevPost, nextPost } = getData(slug);
  return (
    <PostDetail post={data} prevPost={prevPost} nextPost={nextPost}>
      <PostContent>
        <PostMDXContent source={content} />
      </PostContent>
    </PostDetail>
  );
}