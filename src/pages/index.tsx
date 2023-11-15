import { getAllPosts } from '@/api/api';
import RootLayout from '@/app/layout';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Post from '@/interfaces/post';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  console.log(allPosts);

  const tempPost = allPosts[0];
  return (
    <>
      <Layout>
        <Head>
          <title>{`첫 마크다운 글 테스트`}</title>
        </Head>
        {allPosts.map((post, idx) => (
          <div key={idx}>
            <div>{post.title}</div>
            <div>{post.excerpt}</div>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <div>slug: {post.slug}</div>
            </Link>
          </div>
        ))}
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
