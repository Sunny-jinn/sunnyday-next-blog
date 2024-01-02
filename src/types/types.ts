export type PostMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  ogImage: {
    url: string;
  };
  description?: string;
  tags?: string[];
  categories?: string[];
};

export type PostData = PostMeta & {
  contentHtml: string;
};
