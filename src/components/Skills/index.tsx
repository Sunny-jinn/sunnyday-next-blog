import { motion } from 'framer-motion';
import { skills } from './const';
import * as S from './styled';

const Skills = () => {
  const AnimatedTitle = motion(S.SkillTitle);
  const AnimatedLevelBar = motion(S.LevelBar);

  return (
    <motion.div whileInView={'visible'}>
      <S.Title>Skills</S.Title>
      <S.Wrapper>
        {skills.map((skill, idx) => (
          <S.Div key={idx}>
            <AnimatedTitle
              initial={{
                opacity: 0,
              }}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1,
                    delay: 1 + idx * 0.2,
                  },
                },
              }}
            >
              {skill.title}
            </AnimatedTitle>
            <S.TotalBar>
              <AnimatedLevelBar
                level={skill.level}
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + idx * 0.2,
                    },
                  },
                }}
              />
            </S.TotalBar>
          </S.Div>
        ))}
      </S.Wrapper>
    </motion.div>
  );
};

export default Skills;
