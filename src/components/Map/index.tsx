'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Curtain from '../Curtain';
import { Cursor } from '../Cursor';
import * as S from './styled';

const CAMERA_POSITION: [number, number, number] = [0, 0.15, 5];

const useIsDark = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark((document.documentElement.getAttribute('data-theme') ?? 'dark') === 'dark');

    const observer = new MutationObserver(() => {
      setIsDark((document.documentElement.getAttribute('data-theme') ?? 'dark') === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

const Map = () => {
  const isDark = useIsDark();
  const backgroundColor = isDark ? '#333232' : '#f9f8f4';

  return (
    <>
      <S.Wrapper>
        <Canvas
          camera={{ position: CAMERA_POSITION, fov: 36 }}
          dpr={[1, 1.75]}
        >
          <color attach="background" args={[backgroundColor]} />
          <fog attach="fog" args={[backgroundColor, 8, 16]} />

          <hemisphereLight intensity={0.55} color="#fff8f2" groundColor="#5b4a45" />
          <pointLight position={[0, 2.8, 2.6]} intensity={22} distance={12} color="#fff5ee" />
          <spotLight
            position={[0, 0.9, 4.1]}
            angle={0.34}
            penumbra={0.85}
            intensity={26}
            distance={14}
            color="#ffe9dc"
          />

          <Suspense fallback={null}>
            <Curtain />
          </Suspense>
        </Canvas>
      </S.Wrapper>
      <Cursor />
    </>
  );
};

export default Map;
