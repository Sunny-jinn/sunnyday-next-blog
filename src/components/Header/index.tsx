import Link from 'next/link';
import * as S from './styled';

const Header = () => {
  return (
    <S.Wrapper>
      <S.Header>
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
