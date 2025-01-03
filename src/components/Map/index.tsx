import { Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Interface from '../Interface';
import { useCallback, useEffect, useState } from 'react';
import ScrollManager from '../ScrollManager';
import { Office } from '../Character/Office';
import { Cursor } from '../Cursor';
import MagGlasses from '../MagGlasses';

import * as THREE from 'three';
import * as S from './styled';
import Background from '../Background';

const Map = () => {
  const [section, setSection] = useState<number>(0);

  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [scale, setScale] = useState(1);
  const [meshPosition, setMeshPosition] = useState(-7.7);
  const [meshArgs, setMeshArgs] = useState(7.73);

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (windowSize.width <= 900) {
      setScale(0.7);
      setPosition(new THREE.Vector3(-1, -1.5, 0));
      if (windowSize.width <= 574) {
        setMeshPosition(-8.583);
        setMeshArgs(9.5);
      } else {
        setMeshPosition(-9.083);
        setMeshArgs(10.5);
      }
    } else {
      setScale(1);
      setPosition(new THREE.Vector3(0, 0, 0));
      setMeshPosition(-7.7);
      setMeshArgs(7.73);
    }
  }, [windowSize]);

  return (
    <>
      <S.Wrapper>
        <Canvas shadows>
          <ambientLight intensity={2} />
          <directionalLight position={[-5, 5, 5]} intensity={4} castShadow />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <group scale={scale} position={position}>
                <Office />
                <Character section={section} />
              </group>
              <MagGlasses />
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
