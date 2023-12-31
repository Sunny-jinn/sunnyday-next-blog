import * as S from './styled';

type ProjectCardProps = {
  color: string;
};

const ProjectCard = ({ color }: ProjectCardProps) => {
  return (
    <S.Card>
      <S.Content></S.Content>
      <S.ImgBox>
        <img src="/assets/bbangting.jpg" alt="빵팅" width={100} />
      </S.ImgBox>
      <S.TextBox color={color}></S.TextBox>
    </S.Card>
  );
};

export default ProjectCard;
