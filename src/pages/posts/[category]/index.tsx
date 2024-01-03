import { getAllPosts, getPostsByCategory } from '@/api/api';
import { PostData } from '@/types/types';
import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/api/date';
import { useRouter } from 'next/router';
import * as S from '../styled';

const Category: NextPage<{ posts: PostData[]; categories: string[] }> = ({
  posts,
  categories,
}) => {
  const router = useRouter();
  const { category: queryCategory } = router.query;

  return (
    <S.Wrapper>
      <S.Title>POSTS</S.Title>
      <S.Categories>
        <Link href={`/posts`}>
          <S.Category className="notClicked">All</S.Category>
        </Link>
        {categories.map((category: string, idx: number) => (
          <Link href={`/posts/${category}`} key={idx}>
            <S.Category
              className={category === queryCategory ? 'clicked' : 'notClicked'}
            >
              {category}
            </S.Category>
          </Link>
        ))}
      </S.Categories>
      {posts.map((post, idx) => (
        <Link href={`/posts/${post.category}/${post.slug}`} key={idx}>
          <S.Container>
            <S.Img>
              <Image
                src={post.ogImage.url}
                alt="이미지 불러오기 오류"
                width={124}
                height={124}
                style={{
                  marginRight: 40,
                }}
              />
            </S.Img>
            <div style={{ flex: 1 }}>
              <S.PostTitle>
                <S.PostTitleText>{post.title}</S.PostTitleText>
                <S.PostDate>{formatDate(post.date)}</S.PostDate>
              </S.PostTitle>

              <S.PostExcerpt>{post.excerpt}</S.PostExcerpt>
            </div>
          </S.Container>
        </Link>
      ))}
    </S.Wrapper>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { category }: any = params;

  const posts = getPostsByCategory(category as string, [
    'slug',
    'title',
    'date',
    'excerpt',
    'ogImage',
    'category',
  ]);
  const categoriesSet = new Set(
    getAllPosts(['category']).map(post => post.category),
  );
  const categories = Array.from(categoriesSet);
  console.log(categories);
  return { props: { posts, categories } };
};

export async function getStaticPaths() {
  const posts = getAllPosts(['category']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          category: post.category,
        },
      };
    }),
    fallback: false,
  };
}
