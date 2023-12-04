import styled from '@emotion/styled';

// CustomCursorProps 타입 정의
type CustomCursorProps = {
  hoverButton: boolean;
};

// styled.div에 타입을 적용
export const CustomCursor = styled.div<CustomCursorProps>`
  position: fixed;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.3s ease-out;
  width: ${props => (props.hoverButton ? '20px' : '12px')};
  height: ${props => (props.hoverButton ? '20px' : '12px')};
  background-color: ${props => (props.hoverButton ? 'transparent' : '#265073')};
  border: ${props => (props.hoverButton ? '2px solid #265073' : 'none')};
  z-index: 50;
`;
