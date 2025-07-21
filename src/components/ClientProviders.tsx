
'use client';

import Layout from '@/components/Layout';
import GlobalStyle from '@/styles/Global';
import theme from '@/styles/themes';
import { ThemeProvider } from '@emotion/react';

// _app.tsx에 있던 Provider와 Layout 컴포넌트를 클라이언트 컴포넌트로 분리합니다.
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 
        _app.tsx와 동일한 구조를 유지하기 위해 GlobalStyle을 ThemeProvider 외부에 둡니다.
        만약 GlobalStyle이 ThemeProvider의 theme을 사용한다면 ThemeProvider 내부로 옮겨야 합니다.
      */}
      <GlobalStyle theme={theme} />
      <ThemeProvider theme={theme}>
        <Layout back>{children}</Layout>
      </ThemeProvider>
    </>
  );
}
