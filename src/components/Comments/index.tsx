'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as S from './styled';
import { usePathname } from 'next/navigation';

export const Comments = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<string>('gruvbox_light');
  const pathname = usePathname();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  const loadGiscus = () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    iframe?.remove();

    const script = document.querySelector(
      'script[src="https://giscus.app/client.js"]',
    );
    script?.remove();

    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('src', 'https://giscus.app/client.js');
    scriptElement.setAttribute(
      'data-repo',
      process.env.NEXT_PUBLIC_GITHUB_REPO as string,
    );
    scriptElement.setAttribute(
      'data-repo-id',
      process.env.NEXT_PUBLIC_GITHUB_REPO_ID as string,
    );
    scriptElement.setAttribute(
      'data-category',
      process.env.NEXT_PUBLIC_GITHUB_CATEGORY as string,
    );
    scriptElement.setAttribute(
      'data-category-id',
      process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID as string,
    );
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-lang', 'en');
    scriptElement.setAttribute('data-theme', theme);
    scriptElement.setAttribute('data-loading', 'lazy');
    scriptElement.setAttribute('crossorigin', 'anonymous');
    scriptElement.async = true;

    ref.current?.appendChild(scriptElement);
  };

  useEffect(() => {
    if (mounted) {
      loadGiscus();
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      loadGiscus();
    }
  }, [pathname]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app',
    );
  }, [theme]);

  if (!mounted) return null;

  return <S.CommentsContainer ref={ref} />;
};
