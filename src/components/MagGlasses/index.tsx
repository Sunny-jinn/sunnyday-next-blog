import { useCallback, useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MagGlass } from './MagGlass';
import * as THREE from 'three';
import { Group } from 'three';

const MagGlasses = () => {
  const groupRef = useRef<Group>(null);
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [basePosition, setBasePosition] = useState(new THREE.Vector3(0.3, -2.7, 1));
  const [scale, setScale] = useState(0.6);
  const animationTime = useRef(0);

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
      setScale(0.4);
      setBasePosition(new THREE.Vector3(-0.3, -3.1, 1));
    } else {
      setScale(0.6);
      setBasePosition(new THREE.Vector3(0.3, -2.7, 1));
    }
  }, [windowSize]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    animationTime.current += delta;

    const cycleDuration = 5;
    const repeatDelay = 1;
    const totalCycle = cycleDuration + repeatDelay;
    const normalizedTime = (animationTime.current % totalCycle) / cycleDuration;

    if (normalizedTime >= 1) {
      return;
    }

    const xOffset = normalizedTime < 0.25
      ? THREE.MathUtils.lerp(0, 0.2, normalizedTime * 4)
      : normalizedTime < 0.5
      ? THREE.MathUtils.lerp(0.2, 0.1, (normalizedTime - 0.25) * 4)
      : THREE.MathUtils.lerp(0.1, 0, (normalizedTime - 0.5) * 2);

    const yOffset = normalizedTime < 0.25
      ? THREE.MathUtils.lerp(0, -0.5, normalizedTime * 4)
      : normalizedTime < 0.5
      ? THREE.MathUtils.lerp(-0.5, -1, (normalizedTime - 0.25) * 4)
      : THREE.MathUtils.lerp(-1, 0, (normalizedTime - 0.5) * 2);

    const zOffset = normalizedTime < 0.25
      ? THREE.MathUtils.lerp(0, 0, normalizedTime * 4)
      : normalizedTime < 0.5
      ? THREE.MathUtils.lerp(0, 0.2, (normalizedTime - 0.25) * 4)
      : THREE.MathUtils.lerp(0.2, 0, (normalizedTime - 0.5) * 2);

    groupRef.current.position.set(
      basePosition.x + xOffset,
      basePosition.y + yOffset,
      basePosition.z + zOffset
    );
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={basePosition} scale={scale}>
      <MagGlass />
      <mesh position={[0.8, -7.34, 3]} rotation={[0.24, -0.1, 0]}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.3} />
      </mesh>
    </group>
  );
};

export default MagGlasses;
