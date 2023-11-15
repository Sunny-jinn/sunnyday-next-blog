import '@/styles/global.css';
import Header from '../Header';

import * as S from './styled';

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <S.Wrapper>
      <Header />
      <main>{children}</main>
    </S.Wrapper>
  );
};

export default Layout;
