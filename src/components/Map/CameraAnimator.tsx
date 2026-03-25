import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';

const CAMERA_POSITIONS: [number, number, number][] = [
  [0, 0.15, 5],
  [0, 0.15, -5],
];

const GSAP_DURATION = 1.5;

type Props = {
  section: number;
  isAnimating: React.RefObject<boolean>;
};

const CameraAnimator = ({ section, isAnimating }: Props) => {
  const { camera } = useThree();

  useEffect(() => {
    const target = CAMERA_POSITIONS[section];
    if (!target) return;

    gsap.killTweensOf(camera.position);
    gsap.to(camera.position, {
      duration: GSAP_DURATION,
      x: target[0],
      y: target[1],
      z: target[2],
      ease: 'power2.inOut',
      onStart: () => { isAnimating.current = true; },
      onComplete: () => { isAnimating.current = false; },
    });
  }, [section, camera, isAnimating]);

  return null;
};

export default CameraAnimator;
