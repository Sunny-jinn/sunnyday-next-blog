import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Header from '../Header';
import Layout from '../Layout';
import Interface from '../Interface';
import { useState } from 'react';
import ScrollManager from '../ScrollManager';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  return (
    <>
      <Canvas>
        <color attach="background" args={['#F5F0E6']} />
        <ScrollControls pages={4} damping={0.1}>
          <ScrollManager section={section} onSectionChange={setSection} />
          <Character />
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default Map;
