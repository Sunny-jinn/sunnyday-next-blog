import styled from '@emotion/styled';

export const Box = styled.div`
  width: 600px;
  overflow-wrap: break-word;
`;

export const Title = styled.div`
  padding: 2px 15px;
  border-radius: 30px;
  color: #265073;
  font-weight: bold;
  font-size: 24px;
  position: absolute;
  top: 3px;
  left: 100px;
`;

/**
 * TODO: Introduce의 Wrapper와 거의 동일한 코드. 리팩토링 필요
 */
export const Wrapper2 = styled.div`
  color: #265073;
  line-height: 2;
  font-size: 18px;
  background-image: url('/assets/background.svg');
  background-size: 100% 100%;
  border-radius: 30px;
  padding: 60px;
  position: relative;
`;

export const Container = styled.div`
  margin-bottom: 40px;
  & > * + * {
    margin-top: 1rem;
  }
`;

export const Div = styled.div`
  line-height: 1;
  width: 21.5rem;
`;

export const SkillTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #265073;
`;

export const TotalBar = styled.div`
  height: 1rem;
  width: 480px;
  background-color: #2d9596;
  border-radius: 5px;
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
