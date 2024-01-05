import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import { HeaderProps } from '@/types/types';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Header = styled.header<HeaderProps>`
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  font-weight: 700;
  position: fixed;
  opacity: 1;
  z-index: 100;
  background: ${props => (props.back ? '#ecf4d6' : 'transparent')};

  @media ${TABLET_MEDIA_QUERY} {
    max-width: 600px;
    padding: 0 20px;
  }
`;

export const Menus = styled.ul`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  width: 180px;
  justify-content: space-between;
`;

export const Menu = styled.li`
  transition: 0.5s;
  &:hover {
    scale: 1.05;
    color: #265073;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 300;

  @media (min-width: 900px) {
    > :first-child {
      display: none; /* 이미지 숨김 */
    }
  }

  @media ${TABLET_MEDIA_QUERY} {
    > :last-child {
      display: none; /* 텍스트 숨김 */
    }
  }
`;
