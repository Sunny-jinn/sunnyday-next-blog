import styled from '@emotion/styled';

export const Header = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  font-weight: 700;
  position: fixed;
  opacity: 1;
  z-index: 100;

  @media (max-width: 1200px) {
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
