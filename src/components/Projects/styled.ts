import { css } from '@emotion/react';
import styled from '@emotion/styled';

const commonStyle = css`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
`;

export const Wrapper = styled.div`
  height: 90%;
`;

export const Title = styled.h3`
  font-size: 24px;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  flex-wrap: wrap;
`;
