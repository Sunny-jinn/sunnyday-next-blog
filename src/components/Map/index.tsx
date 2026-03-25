'use client';

import { SpotLight } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';
import { Suspense, useEffect, useRef, useState } from 'react';
import Curtain from '../Curtain';
import { Cursor } from '../Cursor';
import ScrollManager from '../ScrollManager';
import CameraAnimator from './CameraAnimator';
import HeartGlow from './HeartGlow';
import Page1 from './Page1';
import Page2 from './Page2';
import * as S from './styled';

const TARGET_INTENSITY = 40;
const TARGET_ATTENUATION = 5;
const FADE_SPEED = 0.8;

const FadeInSpotLight = () => {
  const [intensity, setIntensity] = useState(0);
  const [attenuation, setAttenuation] = useState(0);

  useFrame((_, delta) => {
    setAttenuation((prev) => {
      const next = MathUtils.lerp(prev, TARGET_ATTENUATION, delta * FADE_SPEED * 3);
      return Math.abs(next - TARGET_ATTENUATION) < 0.01 ? TARGET_ATTENUATION : next;
    });
    setIntensity((prev) => {
      const next = MathUtils.lerp(prev, TARGET_INTENSITY, delta * FADE_SPEED);
      return Math.abs(next - TARGET_INTENSITY) < 0.1 ? TARGET_INTENSITY : next;
    });
  });

  return (
    <SpotLight
      position={[2.5, 2.5, 1.5]}
      angle={0.3}
      penumbra={0.5}
      intensity={intensity}
      distance={10}
      color="#ff6688"
      attenuation={attenuation}
      anglePower={3}
    />
  );
};

const CAMERA_POSITION: [number, number, number] = [0, 0.15, 5];
const PAGES = 2;

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
  const [section, setSection] = useState(0);
  const isAnimating = useRef(false);
  const [heartOn, setHeartOn] = useState(false);
  const page1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeartOn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const page1Visible = heartOn && section === 0;

  useEffect(() => {
    const el = page1Ref.current;
    if (!el) return;
    if (page1Visible) {
      el.style.transition = 'opacity 3s ease';
      requestAnimationFrame(() => {
        el.style.opacity = '1';
      });
    } else {
      el.style.transition = 'opacity 1s ease';
      el.style.opacity = '0';
    }
  }, [page1Visible]);

  return (
    <>
      <S.Wrapper>
        <Canvas
          camera={{ position: CAMERA_POSITION, fov: 36 }}
          dpr={[1, 1.75]}
        >
          <color attach="background" args={[backgroundColor]} />
          <fog attach="fog" args={[backgroundColor, 8, 16]} />

          <spotLight
            position={[0, 3, 2]}
            angle={0.5}
            penumbra={0.5}
            intensity={20}
            distance={20}
            color="#ffb6b661"
          />

          <CameraAnimator section={section} isAnimating={isAnimating} />
          <Suspense fallback={null}>
            <Curtain />
            {/* <HeartGlow /> */}
            {heartOn && <FadeInSpotLight />}
          </Suspense>
        </Canvas>

        <S.PageOverlay style={{ opacity: heartOn && section === 0 ? 1 : 0, transition: heartOn && section === 0 ? 'opacity 3s ease' : 'opacity 1s ease' }}>
          <Page1 />
        </S.PageOverlay>
        <S.PageOverlay style={{ opacity: section === 1 ? 1 : 0 }}>
          <Page2 visible={section === 1} />
        </S.PageOverlay>
      </S.Wrapper>

      <ScrollManager
        section={section}
        maxSection={PAGES - 1}
        onSectionChange={setSection}
        isAnimating={isAnimating}
      />
      {/* <Cursor /> */}
    </>
  );
};

export default Map;
