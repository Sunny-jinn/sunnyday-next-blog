import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as S from './styled';
import icon_logo from '../../../public/assets/loading.gif';

const DURATION = 2200;

export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const randomGifUrl = `${icon_logo.src}?timestamp=${new Date().getTime()}`;

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, DURATION);

    const removeSplash = setTimeout(() => {
      setVisible(false);
    }, DURATION + 500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeSplash);
    };
  }, []);

  if (!visible) return null;

  return (
    <S.SplashScreenWrapper className={fadeOut ? 'fade-out' : ''}>
      <Image
        src={randomGifUrl}
        alt="Sunny Logo"
        className="logo"
        width={200}
        height={200}
      />
    </S.SplashScreenWrapper>
  );
};
