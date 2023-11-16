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

      {children}
    </S.Wrapper>
  );
};

export default Layout;
