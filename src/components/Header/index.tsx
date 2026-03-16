'use client';

import Link from 'next/link';
import * as S from './styled';
import { HeaderProps } from '@/types/types';
import Image from 'next/image';

const Header = ({ back, onToggleTheme }: HeaderProps) => {
  return (
    <S.Wrapper>
      <S.Header back={back}>
        <Link href={`/`}>
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
          <S.Menu>
            <Link href={`/posts`}>POSTS</Link>
          </S.Menu>
          <S.Menu onClick={onToggleTheme} style={{ cursor: 'pointer' }}>
            테마
          </S.Menu>
        </S.Menus>
      </S.Header>
    </S.Wrapper>
  );
};

export default Header;
