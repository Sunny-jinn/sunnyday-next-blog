import { Global, Theme, css } from '@emotion/react';

const TABLET_WIDTH = 900;
const MOBILE_WIDTH = 574;
export const TABLET_MEDIA_QUERY = `screen and (max-width:${TABLET_WIDTH}px)`;
export const MOBILE_MEDIA_QUERY = `screen and (max-width:${MOBILE_WIDTH}px)`;

const styles = (theme: Theme) => css`
  :root,
  [data-theme='dark'] {
    --color-black100: #000000;
    --color-white100: #ffffff;
    --color-background: #333232;
    --color-gray100: #c5c5c5;
    --color-gray200: #afafaf;
    --color-gray300: #4a4a4a;
    --color-gray400: #3d3d3d;
    --color-celeste100: #bcf8e8;
    --color-celeste200: #99e6d4;
    --color-link: #265073;
    --color-postDate: #444444;
    --color-divider: #bbbbbb;
    --color-blockquoteBg: #2d353b;
    --color-blockquoteBorder: #4689c0;
    --color-navHoverBg: #d5ddbe;
    --color-link-alpha33: #26507355;
    --color-link-alpha67: #265073aa;
  }

  [data-theme='white'] {
    --color-black100: #000000;
    --color-white100: #222222;
    --color-background: #f9f8f4;
    --color-gray100: #555555;
    --color-gray200: #888888;
    --color-gray300: #d0d0d0;
    --color-gray400: #eeece6;
    --color-celeste100: #2a7c6f;
    --color-celeste200: #3a9b8a;
    --color-link: #1a5a8a;
    --color-postDate: #888888;
    --color-divider: #cccccc;
    --color-blockquoteBg: #e8f4f8;
    --color-blockquoteBorder: #4689c0;
    --color-navHoverBg: #dde8c4;
    --color-link-alpha33: #1a5a8a55;
    --color-link-alpha67: #1a5a8aaa;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    line-height: 1.6;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  ::-webkit-scrollbar {
    display: none;
  }

  html {
    width: 100vw;
    height: 100vh;
  }

* {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  u {
    text-decoration: underline;
  }

  ul,
  li {
    list-style-type: none;
    list-style: none;
  }

  .clicked {
    color: ${theme.color.celeste_100};
    font-weight: 500;
    text-decoration: underline;
    text-underline-position: under;
  }

  .notClicked {
    color: ${theme.color.gray_100};
  }

  blockquote {
    background: ${theme.color.blockquote_bg};
    border-left: 6px solid ${theme.color.blockquote_border};
    color: #fff;
    margin: 0;
    padding-left: 5px;
  }

  strong {
    font-weight: 500;
  }

  blockquote p {
    margin: 3px 0;
  }
`;

const GlobalStyle: React.FC<{ theme?: Theme }> = () => (
  <Global styles={styles} />
);

export default GlobalStyle;
