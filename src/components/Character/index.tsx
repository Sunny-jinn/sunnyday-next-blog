import { RootState, useThree, useFrame } from '@react-three/fiber';
import { MyCharacter } from './MyCharacter';
import { useRef, useCallback, useEffect, useState } from 'react';
import { Group } from 'three';
import * as THREE from 'three';

type CharacterProps = {
  section: number;
};

const Character = ({ section }: CharacterProps) => {
  const [animation, setAnimation] = useState<string>('Typing');
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const groupRef = useRef<Group>(null);

  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [position, setPosition] = useState({
    x: 1.9,
    y: 2,
    z: 0,
  });

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
      setPosition({ x: 1.5, y: 0.5, z: 0 });
    } else {
      setPosition({ x: 1.9, y: 2, z: 0 });
    }
  }, [windowSize]);

  const { viewport }: RootState = useThree();

  useEffect(() => {
    if (!isFirstLoading) {
      setAnimation('Falling');
    }
    setIsFirstLoading(false);
    setTimeout(() => {
      if (section === 0) {
        setAnimation('Typing');
      } else if (section === 1) {
        setAnimation('Waving');
      }
    }, 600);
  }, [section, isFirstLoading]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const targetPos = section === 1
      ? new THREE.Vector3(position.x, -viewport.height - position.y, position.z)
      : new THREE.Vector3(0.5, -1.2, 0.5);

    const targetRot = section === 1
      ? new THREE.Euler(0.5, -2.2, 0.5)
      : new THREE.Euler(0, 0, 0);

    const targetScale = section === 1 ? 2 : 1;

    groupRef.current.position.lerp(targetPos, delta * 0.9);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRot.x,
      delta * 0.9
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRot.y,
      delta * 0.9
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRot.z,
      delta * 0.9
    );
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale * 2, targetScale * 2, targetScale * 2),
      delta * 0.9
    );
  });

  return (
    <group
      ref={groupRef}
      position={[0.5, -1.2, 0.5]}
      scale={2}
    >
      <MyCharacter section={section} animation={animation} />
    </group>
  );
};

export default Character;