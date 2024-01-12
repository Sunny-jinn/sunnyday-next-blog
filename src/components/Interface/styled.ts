import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/Global';
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
    padding-top: ${props => (props.type === 'Skills' ? '150px' : '60px')};
    margin-top: ${props => (props.type === 'Skills' ? '300px' : '0px')};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    padding-top: ${props => (props.type === 'Skills' ? '200px' : '60px')};
    margin-top: ${props => (props.type === 'Skills' ? '200px' : '0px')};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;
