import type { Metadata, Viewport } from 'next';
import { DefaultSeo } from 'next-seo';
import ClientProviders from '@/components/ClientProviders';

import '@/styles/map.css';

// _app.tsx의 SEO 설정을 metadata로 이전합니다.
export const metadata: Metadata = {
  title: "Sunny's blog",
  description: '주니어 프론트엔드 개발자 sunny의 블로그',
  metadataBase: new URL('https://itssunny.day'), // canonical URL의 base가 됩니다.
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://itssunny.day',
    title: "Sunny's blog",
    siteName: "Sunny's blog",
    images: [
      {
        url: '/assets/ogImage.png', // 상대 경로로 변경
        width: 285,
        height: 167,
        alt: '이미지',
      },
    ],
  },
  twitter: {
    creator: '@handle', // 'handle' -> 'creator'로 변경
    site: '@site',
    card: 'summary_large_image',
  },
  verification: {
    google: '0z1PBJv2P6eURobR_lFrxgBYYHiR4RVyR5TFqtYYTTk',
  },
  // 아이콘 설정을 metadata 객체로 이동
  icons: {
    icon: '/assets/sunnylogo_trans.png',
  },
};

// Viewport 설정에서는 아이콘 부분을 제거합니다.
export const viewport: Viewport = {
  themeColor: '#ffffff', // 필요시 테마 색상 지정
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // _document.tsx의 lang="en" 설정을 반영합니다.
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
