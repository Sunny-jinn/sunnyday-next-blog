'use client';

import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Cursor } from '../Cursor';

import * as S from './styled';
import Background from '../Background';
import { MeshBasicMaterial } from 'three';

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
              <CustomComponent />
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

const CustomComponent = () => {
  const GROUP_POSITION = [-1, -1, 0] as const;
  const CAMERA_DEFAULT_POSITION = [0, 0, 5] as const;
  
  const lightPosition = [
    CAMERA_DEFAULT_POSITION[0] - GROUP_POSITION[0], // 0 - (-1) = 1
    CAMERA_DEFAULT_POSITION[1] - GROUP_POSITION[1], // 0 - (-1) = 1
    CAMERA_DEFAULT_POSITION[2] - GROUP_POSITION[2]  // 5 - 0 = 5
  ] as [number, number, number];

  return (
    <>
      <group position={GROUP_POSITION}>
        <axesHelper args={[10]} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <pointLight
          position={[2,2,2]}
          intensity={1000}
          distance={0}
        />
      </group>
    </>
  );
};