import localFont from 'next/font/local';
import Banner from '../Banner';
import Header from '../Header';
import Introduce from '../Introduce';
import * as S from './styled';
import Skills from '../Skills';

import { motion } from 'framer-motion';
import React from 'react';

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

type Props = {
  children: React.ReactNode;
};

const AnimatedSection = motion(S.Section);

const Interface = () => {
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
    viewport: { amount: 0.5 },
  };

  return (
    <S.Wrapper className={myFont.className}>
      <AnimatedSection {...animations}>
        <Banner />
      </AnimatedSection>
      <AnimatedSection {...animations}>
        <Skills />
      </AnimatedSection>
      <AnimatedSection {...animations}>
        <Skills />
      </AnimatedSection>
    </S.Wrapper>
  );
};

export default Interface;
