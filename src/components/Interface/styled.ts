import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

type SectionProps = {
  type?: string;
};

export const Section = styled.section<SectionProps>`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  @media ${TABLET_MEDIA_QUERY} {
    justify-content: flex-start;
    align-items: center;
    padding-top: 60px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
