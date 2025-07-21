export type PostMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  description?: string;
  tags?: string[];
  coverImage: string;
  categories?: string[];
};

export type PostData = PostMeta & {
  contentHtml: string;
};

export type PostListData = Pick<
  PostMeta,
  'slug' | 'title' | 'date' | 'excerpt' | 'coverImage' | 'category'
>;

export type HeaderProps = {
  back?: boolean;
};
