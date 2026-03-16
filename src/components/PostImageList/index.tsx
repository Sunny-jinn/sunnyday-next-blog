import PostImageListScrollable from './Scrollable';

interface ImageItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const PostImageList = ({
  images = [],
  caption,
}: {
  images?: ImageItem[];
  caption?: string;
}) => {
  return <PostImageListScrollable images={images} caption={caption} />;
};
