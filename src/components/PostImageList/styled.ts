import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  width: 100%;
  height: 500px;

  @media ${TABLET_MEDIA_QUERY} {
    height: 400px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    height: 300px;
  }
`;

export const ImageContainer = styled.div`
  flex: 0 0 auto;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ScrollbarContainer = styled.div`
  position: relative;
  width: calc(100% - 20px);
  height: 4px;
  background-color: #26507355;
  border-radius: 2px;
  margin: 15px auto 0;
  display: flex;
  align-items: center;
`;

export const ScrollbarThumb = styled.div`
  position: absolute;
  height: 7px;
  width: 30%;
  background-color: #265073aa;
  border-radius: 999px;
  transition: background-color 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #265073;
  }

  &:active {
    background-color: #265073;
  }
`;

export const Caption = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #bbb;
  text-align: center;
  margin-top: 10px;
`;
