import dynamic from 'next/dynamic';

// Map 컴포넌트를 동적으로 임포트
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false, // 3D 모델은 클라이언트 사이드에서만 렌더링
});

const Home = () => {
  return <Map />;
};

export default Home;
