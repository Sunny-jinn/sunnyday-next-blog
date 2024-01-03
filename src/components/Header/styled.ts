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
  transition: 0.5s;
  background: ${props => (props.back ? '#ecf4d6' : 'transparent')};

  @media ${TABLET_MEDIA_QUERY} {
    max-width: 600px;
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
