import { useRef, useState, useEffect } from 'react';
import * as S from './styled';
import Image from 'next/image';

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const PostImageList = ({
  images,
  caption,
}: {
  images: Image[];
  caption?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollbarDragging, setIsScrollbarDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const thumbWidth = 30;
      const maxPosition = 100 - thumbWidth;
      const scrollPercentage = Math.min(
        maxPosition,
        (scrollLeft / maxScroll) * maxPosition,
      );
      setScrollPosition(scrollPercentage);
    }
  };

  const handleScrollbarDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsScrollbarDragging(true);
    const thumbElement = e.currentTarget as HTMLElement;
    const thumbRect = thumbElement.getBoundingClientRect();
    setStartX(e.clientX - thumbRect.left);
  };

  const handleScrollbarDragMove = (e: MouseEvent) => {
    if (!isScrollbarDragging || !scrollRef.current || !scrollbarRef.current)
      return;

    const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
    const thumbWidth = 20;
    const maxPosition = 100 - thumbWidth;

    const newPosition =
      ((e.clientX - scrollbarRect.left - startX) / scrollbarRect.width) * 100;
    const constrainedPosition = Math.max(0, Math.min(maxPosition, newPosition));

    const scrollableWidth =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft =
      (constrainedPosition / maxPosition) * scrollableWidth;
  };

  const handleScrollbarDragEnd = () => {
    setIsScrollbarDragging(false);
  };

  useEffect(() => {
    if (isScrollbarDragging) {
      document.addEventListener('mousemove', handleScrollbarDragMove);
      document.addEventListener('mouseup', handleScrollbarDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleScrollbarDragMove);
      document.removeEventListener('mouseup', handleScrollbarDragEnd);
    };
  }, [isScrollbarDragging]);

  return (
    <S.Container>
      <S.Wrapper ref={scrollRef} onScroll={handleScroll}>
        {images.map((image, index) => (
          <S.ImageContainer
            key={index}
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          </S.ImageContainer>
        ))}
      </S.Wrapper>
      <S.ScrollbarContainer ref={scrollbarRef}>
        <S.ScrollbarThumb
          style={{ left: `${scrollPosition}%` }}
          onMouseDown={handleScrollbarDragStart}
        />
      </S.ScrollbarContainer>
      {caption && <S.Caption>{caption}</S.Caption>}
    </S.Container>
  );
};
