import localFont from 'next/font/local';
import Banner from '../Banner';
import Header from '../Header';
import Introduce from '../Introduce';
import * as S from './styled';
import Skills from '../Skills';

import { motion } from 'framer-motion';

const myFont = localFont({
  src: [
    {
      path: '../../../public/fonts/SCDream3.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SCDream7.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

const Interface = () => {
  const AnimatedSection = motion(S.Section);

  const animations = {
    initial: {
      opacity: 0,
      y: 50,
    },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.6,
      },
    },
  };

  return (
    <S.Wrapper className={myFont.className}>
      <Header />
      <AnimatedSection {...animations}>
        <Banner />
      </AnimatedSection>
      <AnimatedSection {...animations}>
        <Skills />
      </AnimatedSection>
    </S.Wrapper>
  );
};

export default Interface;
