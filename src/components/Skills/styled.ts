import styled from '@emotion/styled';

export const Title = styled.h2`
  font-size: 1.5rem;
`;

export const Wrapper = styled.div`
  margin-top: 2rem;

  // 모든 자식에게 margin top 추가
  & > * + * {
    margin-top: 1rem;
  }
`;

export const Div = styled.div`
  width: 21.5rem;
`;

export const SkillTitle = styled.h2`
  font-size: 1.25rem; /* Tailwind의 text-xl은 1.25rem입니다. */
  font-weight: bold;
  color: #4a5568; /* Tailwind의 text-gray-800 색상입니다. */
`;

export const TotalBar = styled.div`
  height: 0.5rem; /* Tailwind의 h-2는 0.5rem입니다. */
  width: 100%;
  background-color: #edf2f7; /* Tailwind의 bg-gray-200 색상입니다. */
  border-radius: 9999px; /* Tailwind의 rounded-full은 완전한 원형 모서리입니다. */
  margin-top: 0.5rem; /* Tailwind의 mt-2는 0.5rem입니다. */
`;

interface Props {
  level: number;
}

export const LevelBar = styled.div<Props>`
  height: 100%;
  background-color: #667eea; /* Tailwind의 bg-indigo-500 색상입니다. */
  border-radius: 9999px; /* Tailwind의 rounded-full과 동일합니다. */
  width: ${props => props.level}%;
`;
