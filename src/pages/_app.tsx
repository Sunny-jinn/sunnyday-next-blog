import Layout from '@/components/Layout';
import Map from '@/components/Map';
import GlobalStyle from '@/styles/Global';
import darkTheme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';

import '@/styles/map.css';

const myFont = localFont({
  src: [
    { path: '../../public/fonts/SCDream3.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SCDream5.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/SCDream7.otf', weight: '700', style: 'normal' },
  ],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isFirstPage = router.pathname === '/';

  return (
    <>
      <GlobalStyle />
      {isFirstPage ? (
        <>
          <Map />
        </>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <Layout>
            <main className={myFont.className}>
              <Component {...pageProps} />
            </main>
          </Layout>
        </ThemeProvider>
      )}
    </>
  );
}
