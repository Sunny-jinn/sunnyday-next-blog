import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Character = () => {
  return (
    <div style={{ width: 400, height: '100%' }}>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <color attach="background" args={['#1e1e1e']} />

        <directionalLight position={[4, 5, 6]} intensity={1} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[4, 4, 4]} />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Character;
