import { OrbitControls, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Character from '../Character';
import Header from '../Header';
import Layout from '../Layout';
import Interface from '../Interface';

const Map = () => {
  return (
    <Canvas camera={{ position: [0, 5, 0] }}>
      <color attach="background" args={['#F5F0E6']} />
      <ScrollControls pages={4} damping={0.1}>
        <Character />
        <directionalLight position={[4, 5, 6]} intensity={1} />
        <Scroll html>
          <Interface />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default Map;
