import { OrbitControls } from '@react-three/drei';
import { MagGlass } from './MagGlass';

import { motion } from 'framer-motion-3d';

const MagGlasses = () => {
  return (
    <motion.group
      scale={0.6}
      position={[0.3, -2.7, 1]}
      animate={{
        x: [0.3, 0.5, 0.4, 0.3],
        y: [-2.7, -3.0, -3.7, -2.7],
        z: [1, 1, 1.2, 1],
      }}
      transition={{
        repeat: Infinity,
        repeatDelay: 1,
        duration: 5,
      }}
    >
      <MagGlass />
      <axesHelper args={[5]} />
      {/* <OrbitControls /> */}
      <mesh position={[0.8, -7.34, 3]} rotation={[0.24, -0.1, 0]}>
        {/* <circleGeometry args={[0.68, 32]} /> */}
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.3} />
      </mesh>
    </motion.group>
  );
};

export default MagGlasses;
