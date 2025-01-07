import styled from '@emotion/styled';

export const SplashScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ecf4d6;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition:
    opacity 0.5s ease,
    visibility 0s 0.5s;
  opacity: 1;
  visibility: visible;

  &.fade-out {
    opacity: 0;
    visibility: hidden;
  }
`;
