import { skills } from './const';
import * as S from './styled';

const Skills = () => {
  return (
    <div>
      <S.Title>Skills</S.Title>
      <S.Wrapper>
        {skills.map((skill, idx) => (
          <S.Div key={idx}>
            <S.SkillTitle>{skill.title}</S.SkillTitle>
            <S.TotalBar>
              <S.LevelBar level={skill.level} />
            </S.TotalBar>
          </S.Div>
        ))}
      </S.Wrapper>
    </div>
  );
};

export default Skills;
