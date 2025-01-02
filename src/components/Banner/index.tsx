import * as S from './styled';
import { ReactTyped } from 'react-typed';

const Banner = () => {
  return (
    <S.Intro>
      <S.Container>
        <div>HI 👋</div>
        <S.IntroText>
          I am{' '}
          <strong
            style={{
              backgroundColor: '#265073',
              color: '#fff',
              paddingLeft: 10,
            }}
          >
            <ReactTyped
              strings={['Frontend', 'Three.js', 'React', 'Typescript']}
              typeSpeed={60}
              backSpeed={40}
              style={{
                backgroundColor: '#265073',
              }}
              loop
            />
          </strong>
          <br />
          junior developer
        </S.IntroText>
      </S.Container>
    </S.Intro>
  );
};

export default Banner;
