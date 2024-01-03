import Header from '../Header';

import * as S from './styled';

type Props = {
  preview?: boolean;
  back?: boolean;
  children?: React.ReactNode;
};

const Layout = ({ preview, back, children }: Props) => {
  return (
    <S.Wrapper>
      <Header back={back} />

      {children}
    </S.Wrapper>
  );
};

export default Layout;
