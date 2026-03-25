import { Theme } from '@emotion/react';

const theme: Theme = {
  color: {
    // base
    black_100: 'var(--color-black100)',
    white_100: 'var(--color-white100)',

    // layout
    background: 'var(--color-background)',

    // gray scale
    gray_100: 'var(--color-gray100)',
    gray_200: 'var(--color-gray200)',
    gray_300: 'var(--color-gray300)',
    gray_400: 'var(--color-gray400)',

    // accent
    celeste_100: 'var(--color-celeste100)',
    celeste_200: 'var(--color-celeste200)',

    // post 전용
    link: 'var(--color-link)',
    post_date: 'var(--color-postDate)',
    divider: 'var(--color-divider)',

    // blockquote
    blockquote_bg: 'var(--color-blockquoteBg)',
    blockquote_border: 'var(--color-blockquoteBorder)',

    // 네비게이션
    nav_hover_bg: 'var(--color-navHoverBg)',

    // 상태
    error: 'var(--color-error)',
    disabled_bg: 'var(--color-disabled)',
    header_bg: 'var(--color-headerBg)',
  },
};

// CSS 변수를 사용하므로 두 테마 모두 동일한 객체 (실제 색상 값은 global CSS에서 관리)
export const darkTheme = theme;
export const whiteTheme = theme;
export default theme;
