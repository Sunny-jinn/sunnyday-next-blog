import Image from 'next/image';
import * as S from './styled';
import Link from 'next/link';
import { Github } from '@emotion-icons/evaicons-solid/Github';
import { Instagram } from 'emotion-icons/boxicons-logos';
import { Mail } from 'emotion-icons/material';
import { PostData } from '@/types/types';
import { ArrowLeftCircle } from '@emotion-icons/bootstrap';
import { ArrowRightCircle } from '@emotion-icons/bootstrap';

export const Footer = ({
  prevPost,
  nextPost,
}: {
  prevPost: PostData;
  nextPost: PostData;
}) => {
  return (
    <S.Wrapper>
      <S.Content>
        <Image src="/assets/profile.JPG" alt="logo" width={100} height={100} />
        <S.Intro>
          <S.IntroTitle>Jinwoo Kim</S.IntroTitle>
          <S.IntroSubTitle>Junior Frontend Developer</S.IntroSubTitle>
          <S.IntroIcons>
            <S.IconBox>
              <Link href={'mailto:rlawlsdn316@gmail.com'}>
                <Mail width={20} />
              </Link>
            </S.IconBox>
            <S.IconBox>
              <Link href={'https://github.com/Sunny-jinn'}>
                <Github width={20} />
              </Link>
            </S.IconBox>
            <S.IconBox>
              <Link href={'https://www.instagram.com/sunnyjinn_/'}>
                <Instagram width={20} />
              </Link>
            </S.IconBox>
          </S.IntroIcons>
        </S.Intro>
      </S.Content>
      <S.Navigations>
        {/** 이전 포스트 */}
        {prevPost && (
          <Link href={`/posts/${prevPost.category}/${prevPost.slug}`}>
            <S.Navigation>
              <ArrowLeftCircle width={16} />
              <S.NavigationTitle>{prevPost.title}</S.NavigationTitle>
            </S.Navigation>
          </Link>
        )}

        {/** 다음 포스트 */}
        {nextPost && (
          <S.Right>
            <Link href={`/posts/${nextPost.category}/${nextPost.slug}`}>
              <S.Navigation>
                <S.NavigationTitle>{nextPost.title}</S.NavigationTitle>
                <ArrowRightCircle width={16} />
              </S.Navigation>
            </Link>
          </S.Right>
        )}
      </S.Navigations>
    </S.Wrapper>
  );
};
