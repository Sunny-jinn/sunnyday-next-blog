import * as S from './styled';
import ReactTyped from 'react-typed';

const Banner = () => {
  return (
    <S.Intro>
      <div>HI 👋</div>
      <div>
        I am{' '}
        <strong
          style={{ backgroundColor: '#000', color: '#fff', paddingLeft: 10 }}
        >
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
  );
};

export default Banner;
