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
  background: #555;
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
  transform-origin: top;

  ${Card}:hover & {
    transform: translateY(-100%) rotateX(90deg);
  }
  &::before {
    content: '';
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    width: 144px;
    height: 74px;
    background: #fff;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    z-index: 1;
  }

  img {
    position: relative;
    top: 60px;
    z-index: 1000;
  }
`;

export const TextBox = styled.div`
  ${commonStyle}
  height: 280px;
  border-top: 8px solid #555;
  background: ${props => props.color || ''};
  transform-origin: bottom;
  transition-delay: 0.5s;

  ${Card}:hover & {
    transform: translateY(100%) rotateX(-90deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    width: 160px;
    height: 80px;
    background: #555;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
  }
`;
