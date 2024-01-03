import Link from 'next/link';
import * as S from './styled';
import { HeaderProps } from '@/types/types';

const Header = ({ back }: HeaderProps) => {
  return (
    <S.Wrapper>
      <S.Header back={back}>
        <Link href={`/`}>
          <S.Menu>Sunnyday</S.Menu>
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
