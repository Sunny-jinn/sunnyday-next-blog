import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type Props = {
  section: number;
  onSectionChange: React.Dispatch<React.SetStateAction<number>>;
};

const GSAP_DURATION = 1;

const ScrollManager = ({ section, onSectionChange }: Props) => {
  const data: any = useScroll();
  const lastScroll = useRef<number>(0);
  const isAnimating = useRef<boolean>(false);

  data.fill.classList.add('top');

  useEffect(() => {
    gsap.to(data.el, {
      duration: GSAP_DURATION,
      scrollTop: section * data.el.clientHeight,
      onStart: () => { isAnimating.current = true; },
      onComplete: () => { isAnimating.current = false; },
    });
  }, [section, data.el]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const delta = data.scroll.current - lastScroll.current;
    const maxSection = data.pages - 1;

    if (delta > 0.001 && section < maxSection) {
      onSectionChange(section + 1);
    } else if (delta < -0.001 && section > 0) {
      onSectionChange(section - 1);
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};

export default ScrollManager;
