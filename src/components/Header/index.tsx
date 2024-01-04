import Link from 'next/link';
import * as S from './styled';
import { HeaderProps } from '@/types/types';
import Image from 'next/image';

const Header = ({ back }: HeaderProps) => {
  return (
    <S.Wrapper>
      <S.Header back={back}>
        <Link href={`/`}>
          <S.Menu>
            <S.Logo>
              <Image
                src="/assets/sunnylogo_trans.png"
                alt="로고"
                width={35}
                height={35}
              />
              <span>{'Sunnyday'}</span>
            </S.Logo>
          </S.Menu>
        </Link>
        <S.Menus>
          <Link href={`/posts`}>
            <S.Menu>POSTS</S.Menu>
          </Link>
          <S.Menu>구경하기</S.Menu>
        </S.Menus>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
