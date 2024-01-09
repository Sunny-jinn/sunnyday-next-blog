import Image from 'next/image';
import * as S from './styled';
import { Github } from '@emotion-icons/evaicons-solid/Github';
import { Instagram } from 'emotion-icons/boxicons-logos';
import Link from 'next/link';

const Introduce = () => {
  return (
    <S.Wrapper>
      <S.Title>About me</S.Title>
      <S.AboutCard>
        <Image
          src="/assets/profile.JPG"
          alt=".."
          width={180}
          height={180}
          style={{ borderRadius: 20 }}
        />
        <div style={{ display: 'flex' }}>
          <S.PrivacyCard>
            1999.03.16 rlawlsdn316@gmail.com
            <div style={{ display: 'flex' }}>
              <Link href={'https://github.com/Sunny-jinn'}>
                <S.IconBox>
                  <Github width={40} />
                </S.IconBox>
              </Link>
              <Link href={'https://www.instagram.com/sunnyjinn_/'}>
                <S.IconBox>
                  <Instagram width={40} />
                </S.IconBox>
              </Link>
            </div>
          </S.PrivacyCard>
        </div>
      </S.AboutCard>
      <S.Intro>
        안녕하세요! 프론트엔드 주니어 개발자 <strong>김진우</strong>입니다.
        <br />
        끊임없이 도전하고 학습하며 늘 발전하고, 사용자에게{' '}
        <strong>감동을 주는 웹</strong> 경험을 제공하고자 합니다.
      </S.Intro>
    </S.Wrapper>
  );
};

export default Introduce;
