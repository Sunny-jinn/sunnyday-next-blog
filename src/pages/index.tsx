import { getAllPosts } from '@/api/api';
import RootLayout from '@/app/layout';
import Banner from '@/components/Banner';
import Character from '@/components/Character';
import Header from '@/components/Header';
import Introduce from '@/components/Introduce';
import Layout from '@/components/Layout';
import Post from '@/interfaces/post';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  allPosts: Post[];
};

const Home = ({ allPosts }: Props) => {
  return (
    <>
      <Head>
        <title>{`첫 마크다운 글 테스트`}</title>
      </Head>
      <Banner />
      <Introduce />
      {/* {allPosts.map((post, idx) => (
          <div key={idx}>
            <div>{post.title}</div>
            <div>{post.excerpt}</div>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <div>slug: {post.slug}</div>
            </Link>
          </div>
        ))} */}
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
