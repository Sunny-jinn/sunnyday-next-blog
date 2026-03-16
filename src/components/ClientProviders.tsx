'use client';

import Layout from '@/components/Layout';
import GlobalStyle from '@/styles/Global';
import darkTheme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function MdxHotReload() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const es = new EventSource('/api/dev-watch');
    es.onmessage = () => router.refresh();
    return () => es.close();
  }, [router]);
  return null;
}

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'white' : 'dark';
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <MdxHotReload />
      <Layout back onToggleTheme={toggleTheme}>
        {children}
      </Layout>
    </ThemeProvider>
  );
}
