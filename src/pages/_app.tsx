import Layout from '@/components/Layout';
import Map from '@/components/Map';
import GlobalStyle from '@/styles/Global';
import darkTheme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';

import '@/styles/map.css';
import Head from 'next/head';

export const myFont = localFont({
  src: [
    { path: '../../public/fonts/SCDream3.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SCDream5.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/SCDream7.otf', weight: '700', style: 'normal' },
    {
      path: '../../public/fonts/BagelFatOne-Regular.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isFirstPage = router.pathname === '/';

  return (
    <>
      <Head>
        <title>{"Sunny's blog"}</title>
        <link rel="icon" href="/assets/sunnylogo_trans.png" />
      </Head>
      <GlobalStyle />
      {isFirstPage ? (
        <>
          <Map />
        </>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <main className={myFont.className}>
            <Layout back>
              <Component {...pageProps} />
            </Layout>
          </main>
        </ThemeProvider>
      )}
    </>
  );
}
