
const Background = () => {
  return (
    <mesh position={[0, -7.7, 0]}>
      <planeGeometry args={[20, 7.73]} />
      <meshStandardMaterial color={'#2d9596'} />
    </mesh>
  );
};

export default Background;
