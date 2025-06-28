import Image from 'next/image';
import * as S from './styled';

const Maintenance = () => {
  return (
    <S.Wrapper>
      <S.Logo>
        <Image
          src="/assets/sunnylogo_trans.png"
          alt="로고"
          width={35}
          height={35}
        />
        <span>{'Sunnyday'}</span>
      </S.Logo>
      <S.Text>현재 블로그 수정 중입니다.</S.Text>
    </S.Wrapper>
  );
};

export default Maintenance;
