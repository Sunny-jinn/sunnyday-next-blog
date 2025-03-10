import { Global, Theme, css } from '@emotion/react';

const TABLET_WIDTH = 900;
const MOBILE_WIDTH = 574;
export const TABLET_MEDIA_QUERY = `screen and (max-width:${TABLET_WIDTH}px)`;
export const MOBILE_MEDIA_QUERY = `screen and (max-width:${MOBILE_WIDTH}px)`;

const styles = (theme: Theme) => css`
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
    color: '#000';
    background-color: #ecf4d6;
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
    color: #265073;
    font-weight: 500;
    text-decoration: underline;
    text-underline-position: under;
  }

  .notClicked {
    color: #666;
  }

  blockquote {
    background: #2d353b;
    border-left: 6px solid #4689c0;
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

const GlobalStyle: React.FC = () => <Global styles={styles} />;

export default GlobalStyle;
