import { RootState, useThree } from '@react-three/fiber';
import { MyCharacter } from './MyCharacter';

import { motion } from 'framer-motion-3d';
import { useCallback, useEffect, useState } from 'react';

type CharacterProps = {
  section: number;
};

const Character = ({ section }: CharacterProps) => {
  const [animation, setAnimation] = useState<string>('Typing');
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true); // 블로그 처음 방문 시 떨어지는 애니메이션 재생 안 되게

  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  const [position, setPosition] = useState({
    x: 1.9,
    y: 2,
    z: 0,
  });

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
      setPosition({ x: 1.5, y: 0.5, z: 0 });
    } else {
      setPosition({ x: 1.9, y: 2, z: 0 });
    }
  }, [windowSize]);

  const { viewport }: RootState = useThree();

  useEffect(() => {
    if (!isFirstLoading) {
      setAnimation('Falling');
    }
    setIsFirstLoading(false);
    setTimeout(() => {
      if (section === 0) {
        // 첫 화면일 때
        setAnimation('Typing');
      } else if (section === 1) {
        setAnimation('Waving');
      }
    }, 600);
  }, [section]);

  return (
    <motion.group
      position={[0.5, -1.2, 0.5]}
      animate={'' + section}
      transition={{ duration: 1.1 }}
      variants={{
        0: {},
        1: {
          y: -viewport.height - position.y,
          x: position.x,
          z: position.z,
          rotateX: 0.5,
          rotateY: -2.2,
          rotateZ: 0.5,
          scaleX: 2,
          scaleY: 2,
          scaleZ: 2,
        },
      }}
      scale={2}
    >
      <MyCharacter section={section} animation={animation} />
    </motion.group>
  );
};

export default Character;
