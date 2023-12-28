import ProjectCard from '../ProjectCard';
import * as S from './styled';

const Projects = () => {
  return (
    <S.Wrapper>
      <S.Title>Projects</S.Title>
      <S.Container>
        <ProjectCard color={'#ff123f'} />
        <ProjectCard color={'#12ff12'} />
        <ProjectCard color={'#1265ff'} />
      </S.Container>
    </S.Wrapper>
  );
};

export default Projects;
