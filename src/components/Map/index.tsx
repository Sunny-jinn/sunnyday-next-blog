'use client';

import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Cursor } from '../Cursor';

import * as S from './styled';
import Background from '../Background';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  return (
    <>
      <S.Wrapper>
        <Canvas shadows>
          <ambientLight intensity={2} />
          <directionalLight position={[-5, 5, 5]} intensity={4} castShadow />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Background />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </S.Wrapper>
      <Cursor />
    </>
  );
};

export default Map;
