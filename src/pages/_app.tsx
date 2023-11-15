import Layout from '@/components/Layout';
import GlobalStyle from '@/styles/Global';
import darkTheme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';

import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    { path: '../../public/fonts/SCDream3.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SCDream7.otf', weight: '700', style: 'normal' },
  ],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <main className={myFont.className}>
          <GlobalStyle />
          <Component {...pageProps} />
        </main>
      </Layout>
    </ThemeProvider>
  );
}
