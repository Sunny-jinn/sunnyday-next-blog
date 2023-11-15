import { Global, Theme, css } from '@emotion/react';

const styles = (theme: Theme) => css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif;
    line-height: 1.6;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }

  html {
    width: 100%;
    height: 100%;
    color: ${theme.color.white100};
    background-color: ${theme.color.background};
  }

  body::-webkit-scrollbar {
    display: none;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  li {
    list-style-type: none;
    list-style: none;
  }
`;

const GlobalStyle: React.FC = () => <Global styles={styles} />;

export default GlobalStyle;
