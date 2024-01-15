import { MOBILE_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  color: #265073;
  line-height: 2;
  font-size: 18px;
  background-image: url('/assets/background_about.svg');
  background-size: 100% 100%;
  padding: 60px;
  margin-bottom: -30px;
  position: relative;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 50px 34px;
    width: calc(100vw - 40px);
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const AboutCard = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    img {
      max-width: 100px;
      max-height: 100px;
      width: 23vw;
      height: 23vw;
    }
  }
`;

export const PrivacyCard = styled.div`
  font-weight: bold;
  margin-left: 50px;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-left: 30px;
    font-size: 2.5vw;

    line-height: 1.8;
  }
`;

export const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 30px;
  }

  &:hover {
    scale: 1.1;
  }
`;

export const Title = styled.div`
  padding: 2px 15px;
  border-radius: 30px;
  color: #265073;
  font-weight: bold;
  font-size: 24px;
  position: absolute;
  top: 2px;
  left: 12%;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 4vw;
    top: 18px;
    left: 10%;
  }
`;

export const Intro = styled.div`
  margin-bottom: 10px;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 2.5vw;
  }
`;
