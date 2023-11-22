import styled from '@emotion/styled';

export const Title = styled.h2`
  font-size: 1.5rem;
  background: linear-gradient(to right, #7d1300, #d34228);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
`;

export const Wrapper = styled.div`
  margin-top: 2rem;

  // 모든 자식에게 margin top 추가
  & > * + * {
    margin-top: 1rem;
  }
`;

export const Div = styled.div`
  line-height: 1;
  width: 21.5rem;
`;

export const SkillTitle = styled.h2`
  font-size: 1.25rem; /* Tailwind의 text-xl은 1.25rem입니다. */
  font-weight: bold;
  color: #402e32; /* Tailwind의 text-gray-800 색상입니다. */
`;

export const TotalBar = styled.div`
  height: 1rem; /* Tailwind의 h-2는 0.5rem입니다. */
  width: 100%;
  background-color: #d3966f; /* Tailwind의 bg-gray-200 색상입니다. */
  border-radius: 9999px; /* Tailwind의 rounded-full은 완전한 원형 모서리입니다. */
  margin-top: 0.5rem; /* Tailwind의 mt-2는 0.5rem입니다. */
`;

interface Props {
  level: number;
}

export const LevelBar = styled.div<Props>`
  height: 100%;
  background: linear-gradient(to right, #7d1300, #d34228);
  border-radius: 9999px; /* Tailwind의 rounded-full과 동일합니다. */
  width: ${props => props.level}%;
`;
