import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Intro = styled.div`
  font-size: 60px;
  padding-bottom: 150px;
`;

export const IntroText = styled.div`
  @media ${TABLET_MEDIA_QUERY} {
    font-size: 40px;
  }
`;
