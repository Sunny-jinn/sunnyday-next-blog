import Layout from '@/components/Layout';
import Map from '@/components/Map';
import GlobalStyle from '@/styles/Global';
import darkTheme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';

import '@/styles/map.css';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

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

const DEFAULT_SEO = {
  title: "Sunny's blog",
  description: '주니어 프론트엔드 개발자 sunny의 블로그',
  canonical: '',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://sunnyday-drab.vercel.app',
    title: "Sunny's blog",
    site_name: "Sunny's blog",
    images: [
      {
        url: '/assets/ogImage.png',
        width: 285,
        height: 167,
        alt: '이미지',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isFirstPage = router.pathname === '/';

  return (
    <>
      <Head>
        <title>{"Sunny's blog"}</title>
        <link rel="icon" href="/assets/sunnylogo_trans.png" />
        <meta
          name="google-site-verification"
          content="0z1PBJv2P6eURobR_lFrxgBYYHiR4RVyR5TFqtYYTTk"
        />
      </Head>
      <DefaultSeo {...DEFAULT_SEO} />
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
