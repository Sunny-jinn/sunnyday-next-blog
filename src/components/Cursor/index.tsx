import { useEffect, useRef, useState } from 'react';
import * as S from './styled';

const CURSOR_SPEED = 0.35;

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef<HTMLDivElement>(null);
  const [hoverButton, setHoverButton] = useState(false);

  console.log('Cursor');

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const mouseMoveHandler = (event: any) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    const animateEvent = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  return (
    <>
      <S.CustomCursor hoverButton={hoverButton} ref={cursorOutline} />
    </>
  );
};
