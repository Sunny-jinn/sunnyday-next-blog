import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;

  @media ${TABLET_MEDIA_QUERY} {
    .canvas {
      height: 200px !important;
    }
  }
`;
