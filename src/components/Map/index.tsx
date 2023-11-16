import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Header from '../Header';

const Map = () => {
  return (
    <Canvas camera={{ position: [0, 5, 0] }}>
      <color attach="background" args={['#F5F0E6']} />
      <ScrollControls>
        <Character />
        <OrbitControls />
        <Scroll html>
          <Header />
        </Scroll>
        <directionalLight position={[4, 5, 6]} intensity={1} />
      </ScrollControls>
    </Canvas>
  );
};

export default Map;
