import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.divider};
  margin-top: 30px;
  padding: 50px 0;
  margin-top: 100px;
`;

export const Content = styled.div`
  display: flex;
  gap: 30px;
  max-width: 1200px;

  img {
    border-radius: 999px;
  }
`;

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const IntroTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const IntroSubTitle = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray_200};
`;

export const IntroIcons = styled.div`
  display: flex;
  gap: 5px;
`;

export const IconBox = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.color.post_date};
  transition: all 0.2s ease;

  &:hover {
    scale: 1.05;
    color: ${({ theme }) => theme.color.white_100};
  }
`;

export const Navigations = styled.div`
  display: flex;
  width: 100%;
`;

export const Right = styled.div`
  margin-left: auto;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 5px 10px;
  transition: all 0.2s ease;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray_200};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.white_100};
    background-color: ${({ theme }) => theme.color.nav_hover_bg};
  }
`;

// 반응형 처리하기
export const NavigationTitle = styled.span`
  font-size: 13px;
  line-height: 1.1;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  max-width: 300px;
  @media ${TABLET_MEDIA_QUERY} {
    max-width: 150px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    max-width: 100px;
  }
`;
