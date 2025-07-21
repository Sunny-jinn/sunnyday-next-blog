'use client'; // Map 컴포넌트가 ssr: false이므로, 이 페이지는 클라이언트 컴포넌트여야 합니다.

import dynamic from 'next/dynamic';

// Map 컴포넌트를 동적으로 임포트
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false, // 3D 모델은 클라이언트 사이드에서만 렌더링
});

const Home = () => {
  return <Map />;
};

export default Home;