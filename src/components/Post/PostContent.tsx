
'use client';

import { PostImage } from '@/components/PostImage';
import { PostImageList } from '@/components/PostImageList';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect } from 'react';

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

// useEffect를 사용하는 부분을 클라이언트 컴포넌트로 분리합니다.
export default function PostContent({ mdxSource }: Props) {
  useEffect(() => {
    hljs.highlightAll();
  }, [mdxSource]);

  const components = { PostImage, PostImageList };

  return <MDXRemote {...mdxSource} components={components} />;
}
