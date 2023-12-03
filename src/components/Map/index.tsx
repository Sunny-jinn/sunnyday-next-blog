import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Header from '../Header';
import Layout from '../Layout';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Office } from '../Character/Office';
import { Cursor } from '../Cursor';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  return (
    <>
      <Layout>{/** HEADER */}</Layout>
      <Canvas shadows>
        <ambientLight intensity={2} />
        <directionalLight position={[-5, 5, 5]} intensity={4} castShadow />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Scroll>
            <Office />
            <Character section={section} />
            {/* <Temp /> */}
            <mesh position={[0, -7.7, 0]}>
              <planeGeometry args={[15, 7.73]} />
              <meshStandardMaterial color={'#c1835c'} />
            </mesh>
          </Scroll>
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Cursor />
    </>
  );
};

export default Map;
