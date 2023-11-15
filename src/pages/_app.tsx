import { AppProps } from 'next/app';
import '@/styles/global.css';

import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    { path: '../../public/fonts/SCDream3.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SCDream7.otf', weight: '700', style: 'normal' },
  ],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
