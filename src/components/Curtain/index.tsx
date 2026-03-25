'use client';

import { useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

const MODEL_PATH = '/models/curtain.glb';
const VIEWPORT_HEIGHT_RATIO = 1.1;

const Curtain = () => {
  const { scene } = useGLTF(MODEL_PATH);
  const { camera, viewport } = useThree();

  const { model, position, scale } = useMemo(() => {
    const clonedScene = scene.clone();
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const safeHeight = size.y || 1;
    const currentViewport = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, 0));
    const targetHeight = currentViewport.height * VIEWPORT_HEIGHT_RATIO;
    const fitScale = targetHeight / safeHeight;

    return {
      model: clonedScene,
      position: [
        -center.x * fitScale,
        -center.y * fitScale,
        -center.z * fitScale,
      ] as [number, number, number],
      scale: fitScale,
    };
  }, [camera, scene, viewport]);

  return (
    <>
      <group position={position} scale={scale}>
        <primitive object={model} />
      </group>
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </>
  );
};

useGLTF.preload(MODEL_PATH);

export default Curtain;
