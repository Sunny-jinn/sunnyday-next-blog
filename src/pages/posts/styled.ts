import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200px;
`;

export const Container = styled.div`
  position: relative;
  width: 900px;
  height: 170px;
  display: flex;
  padding: 20px 0;

  @media (max-width: 900px) {
    width: 100%;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 0.5px;
    background-color: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
`;

export const PostTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
`;

export const PostDate = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #777;
  margin-left: auto;
`;

export const PostExcerpt = styled.div`
  width: 100%;
`;
