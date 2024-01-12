import { useCallback, useEffect, useState } from 'react';
import { MagGlass } from './MagGlass';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

const MagGlasses = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [position, setPosition] = useState(new THREE.Vector3(0.3, -2.7, 1));
  const [scale, setScale] = useState(0.6);

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
      setPosition(new THREE.Vector3(-0.3, -3.1, 1));
    } else {
      setScale(0.6);
      setPosition(new THREE.Vector3(0.3, -2.7, 1));
    }
  }, [windowSize]);

  return (
    <motion.group
      scale={scale}
      position={position}
      animate={{
        x: [position.x, position.x + 0.2, position.x + 0.1, position.x],
        y: [position.y, position.y - 0.5, position.y - 1, position.y],
        z: [position.z, position.z, position.z + 0.2, position.z],
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 1,
        duration: 5,
      }}
    >
      <MagGlass />
      <mesh position={[0.8, -7.34, 3]} rotation={[0.24, -0.1, 0]}>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.3} />
      </mesh>
    </motion.group>
  );
};

export default MagGlasses;
