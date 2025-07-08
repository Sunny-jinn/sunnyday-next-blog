import Layout from '@/components/Layout';
import GlobalStyle from '@/styles/Global';
import theme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';

import '@/styles/map.css';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const DEFAULT_SEO = {
  title: "Sunny's blog",
  description: '주니어 프론트엔드 개발자 sunny의 블로그',
  canonical: '',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://itssunny.day',
    title: "Sunny's blog",
    site_name: "Sunny's blog",
    images: [
      {
        url: 'https://itssunny.day/assets/ogImage.png',
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

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <Layout back>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
