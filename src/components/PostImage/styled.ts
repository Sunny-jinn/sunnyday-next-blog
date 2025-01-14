import { MOBILE_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    max-height: 300px;
  }

  img {
    max-width: 100%;
  }
`;

export const Caption = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #bbb;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9; // 또는 원하는 비율
`;
