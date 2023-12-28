import * as S from './styled';

const ProjectCard = ({ color }) => {
  return (
    <S.Card>
      <S.Content></S.Content>
      <S.ImgBox></S.ImgBox>
      <S.TextBox color={color}></S.TextBox>
    </S.Card>
  );
};

export default ProjectCard;
