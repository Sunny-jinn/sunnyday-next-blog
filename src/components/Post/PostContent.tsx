
'use client';

import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function PostContent({ children }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, [children]);

  return <>{children}</>;
}
