import Link from 'next/link';
import * as S from './styled';
import { HeaderProps } from '@/types/types';
import Image from 'next/image';

const Header = ({ back }: HeaderProps) => {
  return (
    <S.Wrapper>
      <S.Header back={back}>
        <Link href={`/`}>
          {/** 상위 태그에 ul이 없으니 li요소인 Menu 사용 대신
           * style 복사 후 div 요소인 LogoMenu 사용
           */}
          <S.LogoMenu>
            <S.Logo>
              <Image
                src="/assets/sunnylogo_trans.png"
                alt="로고"
                width={35}
                height={35}
              />
              <span>{'Sunnyday'}</span>
            </S.Logo>
          </S.LogoMenu>
        </Link>
        <S.Menus>
          {/** Link를 Menu 안에 넣음으로써 접근성 개선 */}
          <S.Menu>
            <Link href={`/posts`}>POSTS</Link>
          </S.Menu>
          <S.Menu>구경하기</S.Menu>
        </S.Menus>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
