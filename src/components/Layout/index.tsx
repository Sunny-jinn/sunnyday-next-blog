import localFont from 'next/font/local';
import Header from '../Header';

import * as S from './styled';

type Props = {
  preview?: boolean;
  back?: boolean;
  children?: React.ReactNode;
};

export const myFont = localFont({
  src: [
    {
      path: '../../../public/fonts/SCDream3.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SCDream5.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SCDream7.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/BagelFatOne-Regular.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
});

const Layout = ({ preview, back, children }: Props) => {
  return (
    <main className={myFont.className}>
      <S.Wrapper>
        <Header back={back} />

        {children}
      </S.Wrapper>
    </main>
  );
};

export default Layout;
