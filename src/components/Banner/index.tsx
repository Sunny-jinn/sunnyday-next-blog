import Image from 'next/image';

import * as S from './styled';
import ReactTyped from 'react-typed';
import Character from '../Character';

const Banner = () => {
  return (
    <S.Wrapper>
      {/* <Image
        src="/assets/profile.JPG"
        alt="프로필 사진"
        width={300}
        height={300}
        style={{ borderRadius: 150 }}
      /> */}
      <Character />
      <S.Intro>
        <div>HI 👋</div>
        <div>
          I am{' '}
          <strong>
            <ReactTyped
              strings={['Frontend', 'Three.js', 'React', 'Typescript']}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </strong>
          <br />
          junior developer
        </div>
      </S.Intro>
    </S.Wrapper>
  );
};

export default Banner;
