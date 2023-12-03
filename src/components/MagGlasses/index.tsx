import { MagGlass } from './MagGlass';

const MagGlasses = () => {
  return (
    <>
      <MagGlass />
      <mesh position={[1.5, -7.5, 1]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshPhysicalMaterial roughness={0} transmission={1} thickness={0.5} />
      </mesh>
    </>
  );
};

export default MagGlasses;
