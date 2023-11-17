import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Header from '../Header';
import Layout from '../Layout';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Office } from '../Character/Office';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  return (
    <>
      <Layout>{/** HEADER */}</Layout>
      <Canvas>
        <color attach="background" args={['#F5F0E6']} />
        <ambientLight intensity={4} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
            <Office />
            <Character section={section} />
          </Scroll>
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default Map;
