import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      // base
      black_100: string;
      white_100: string;

      // layout
      background: string;

      // gray scale
      gray_100: string; // notClicked 카테고리 텍스트 (연한 회색)
      gray_200: string; // 날짜, 컨테이너 border (중간 회색)
      gray_300: string;
      gray_400: string; // 카드 hover 배경 (진한 회색)

      // accent
      celeste_100: string; // 클릭된 카테고리, hover 강조색
      celeste_200: string; // 서브 강조색

      // post 전용
      link: string;       // 포스트 내 링크, 카테고리 텍스트
      post_date: string;  // 포스트 날짜 색
      divider: string;    // 포스트 구분선 색

      // blockquote
      blockquote_bg: string;
      blockquote_border: string;

      // 네비게이션
      nav_hover_bg: string;
    };
  }
}
