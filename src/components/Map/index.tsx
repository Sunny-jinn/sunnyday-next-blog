import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Layout from '../Layout';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Office } from '../Character/Office';
import { Cursor } from '../Cursor';
import MagGlasses from '../MagGlasses';
import { myFont } from '@/pages/_app';

import * as S from './styled';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  return (
    <>
      <main className={myFont.className}>
        <Layout></Layout>
      </main>
      <S.Wrapper>
        <Canvas
          shadows
          style={{
            transform: '',
          }}
          className="canvas"
        >
          <ambientLight intensity={2} />
          <directionalLight position={[-5, 5, 5]} intensity={4} castShadow />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Office />
              <Character section={section} />
              <MagGlasses />
              <mesh position={[0, -7.7, 0]}>
                <planeGeometry args={[15, 7.73]} />
                <meshStandardMaterial color={'#2d9596'} />
              </mesh>
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
