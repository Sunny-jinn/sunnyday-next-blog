import Image from 'next/image';

import * as S from './styled';

const Banner = () => {
  return (
    <S.Wrapper>
      <Image
        src="/assets/profile.JPG"
        alt="프로필 사진"
        width={300}
        height={300}
        style={{ borderRadius: 150 }}
      />
      <div style={{ fontSize: 30 }}>
        <div>안녕하세요</div>
        <div>Frontend 개발자 김진우 입니다</div>
      </div>
    </S.Wrapper>
  );
};

export default Banner;
