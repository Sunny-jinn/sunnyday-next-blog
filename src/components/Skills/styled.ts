import { MOBILE_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Box = styled.div`
  width: 600px;
  overflow-wrap: break-word;
  position: relative;

  @media ${MOBILE_MEDIA_QUERY} {
    width: 100%;
    max-width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

/**
 * TODO: Introduce의 Wrapper와 거의 동일한 코드. 리팩토링 필요
 */
export const Wrapper2 = styled.div`
  width: 100%;
  color: #265073;
  line-height: 2;
  font-size: 18px;
  background-image: url('/assets/background_skills.svg');
  background-size: 100% 100%;
  border-radius: 30px;
  padding: 60px;
  position: relative;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 60px 34px;
  }
`;

export const Title = styled.div`
  padding: 2px 15px;
  border-radius: 30px;
  color: #265073;
  font-weight: bold;
  font-size: 24px;
  position: absolute;
  top: 3px;
  left: 16.5%;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 18px;
    top: 15px;
    left: 15%;
  }
`;

export const Container = styled.div`
  margin-bottom: 40px;
  & > * + * {
    margin-top: 1rem;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    margin-bottom: 20px;
  }
`;

export const Div = styled.div`
  line-height: 1;

  @media ${MOBILE_MEDIA_QUERY} {
    line-height: 0.6;
  }
`;

export const SkillTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #265073;

  @media ${MOBILE_MEDIA_QUERY} {
    font-size: 2.5vw;
  }
`;

export const TotalBar = styled.div`
  height: 1rem;
  background-color: #2d9596;
  border-radius: 5px;

  @media ${MOBILE_MEDIA_QUERY} {
    height: 1vh;
  }
`;

interface Props {
  level: number;
}

export const LevelBar = styled.div<Props>`
  height: 100%;
  background: linear-gradient(to right, #265073, #3876a8);
  border-radius: 5px;
  width: ${props => props.level}%;
`;
