import dynamic from 'next/dynamic';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sunny's blog - 프론트엔드 개발자의 기술 블로그",
  description:
    '주니어 프론트엔드 개발자 sunny의 기술 블로그입니다. React, Next.js, TypeScript 등의 개발 경험을 공유합니다.',
  openGraph: {
    type: 'website',
    url: '/',
    title: "Sunny's blog - 프론트엔드 개발자의 기술 블로그",
    description:
      '주니어 프론트엔드 개발자 sunny의 기술 블로그입니다. React, Next.js, TypeScript 등의 개발 경험을 공유합니다.',
    images: [
      {
        url: '/assets/ogImage.png',
        width: 285,
        height: 167,
      },
    ],
  },
};

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const Home = () => {
  return <Map />;
};

export default Home;
