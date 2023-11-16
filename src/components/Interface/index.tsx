import localFont from 'next/font/local';
import Banner from '../Banner';
import Header from '../Header';
import Introduce from '../Introduce';
import * as S from './styled';
import Skills from '../Skills';

const AboutSection = () => {
  return (
    <S.Section>
      <Banner />
    </S.Section>
  );
};

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
  return (
    <S.Wrapper className={myFont.className}>
      <Header />
      <AboutSection />
      <Skills />
    </S.Wrapper>
  );
};

export default Interface;
