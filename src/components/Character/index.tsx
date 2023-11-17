import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MyCharacter } from './MyCharacter';

type CharacterProps = {
  section: number;
};

const Character = ({ section }: CharacterProps) => {
  return <MyCharacter section={section} />;
};

export default Character;
