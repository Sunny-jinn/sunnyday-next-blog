import styled from '@emotion/styled';

export const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.background};
  color: ${({ theme }) => theme.color.white_100};
  transition: background-color 0.3s, color 0.3s;
`;
