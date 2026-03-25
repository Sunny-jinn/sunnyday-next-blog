import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

type CustomCursorProps = {
  hoverButton: boolean;
};

export const CustomCursor = styled.div<CustomCursorProps>`
  position: fixed;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.3s ease-out;
  width: ${props => (props.hoverButton ? '20px' : '12px')};
  height: ${props => (props.hoverButton ? '20px' : '12px')};
  background-color: ${props => (props.hoverButton ? 'transparent' : props.theme.color.link)};
  border: ${props => (props.hoverButton ? `2px solid ${props.theme.color.link}` : 'none')};
  z-index: 50;

  @media ${TABLET_MEDIA_QUERY} {
    display: none;
  }
`;
