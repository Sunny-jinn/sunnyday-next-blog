import Image from 'next/image';
import * as S from './styled';
export const PostImage = ({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) => {
  return (
    <S.Wrapper>
      <Image src={src} alt={alt} width={width} height={height} />
      {caption && <S.Caption>{caption}</S.Caption>}
    </S.Wrapper>
  );
};