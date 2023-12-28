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

export const Content = styled.div``;

export const Card = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  background: rgba(33, 33, 33, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ImgBox = styled.div`
  ${commonStyle}
  background: #fff;
  height: 120px;
  z-index: 1;
`;

export const TextBox = styled.div`
  ${commonStyle}
  height: 280px;
  background: ${props => props.color || ''};
  border-top: 8px solid rgba(33, 33, 33, 0.5);
`;
