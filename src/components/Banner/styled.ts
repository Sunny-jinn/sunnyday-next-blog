import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Intro = styled.div`
  font-size: 60px;
  padding-bottom: 150px;

  @media ${TABLET_MEDIA_QUERY} {
    width: 100%;
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, #ecf4d6 60%, transparent);
  }
`;

export const Container = styled.div`
  @media ${TABLET_MEDIA_QUERY} {
    width: 400px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    width: 250px;
  }
`;

export const IntroText = styled.div`
  @media ${TABLET_MEDIA_QUERY} {
    font-size: 48px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 30px;
  }
`;
