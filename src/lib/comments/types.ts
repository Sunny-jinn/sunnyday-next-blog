export type CommentNode = {
  id: number;
  nickname: string;
  body: string;
  isOwner: boolean;
  deleted: boolean;
  createdAt: string;
  parentId: number | null;
  replies: CommentNode[];
};
