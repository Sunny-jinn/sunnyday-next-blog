'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const MODEL_PATH = '/models/curtain.glb';
const TARGET_HEIGHT = 3.8;
const FLOOR_OFFSET = -1.35;

const Curtain = () => {
  const { scene } = useGLTF(MODEL_PATH);

  const { model, position, scale } = useMemo(() => {
    const clonedScene = scene.clone();
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const safeHeight = size.y || 1;
    const fitScale = TARGET_HEIGHT / safeHeight;

    return {
      model: clonedScene,
      position: [
        -center.x * fitScale,
        -center.y * fitScale + FLOOR_OFFSET,
        -center.z * fitScale,
      ] as [number, number, number],
      scale: fitScale,
    };
  }, [scene]);

  return (
    <group position={position} scale={scale}>
      <primitive object={model} />
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

export default Curtain;
