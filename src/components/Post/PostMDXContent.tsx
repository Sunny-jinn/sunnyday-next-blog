import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import { PostImage } from '@/components/PostImage';
import { PostImageList } from '@/components/PostImageList';

interface Props {
  source: string;
}

export default function PostMDXContent({ source }: Props) {
  return (
    <MDXRemote
      source={source}
      components={{ PostImage, PostImageList }}
      options={{
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [remarkToc, remarkGfm],
        },
      }}
    />
  );
}
