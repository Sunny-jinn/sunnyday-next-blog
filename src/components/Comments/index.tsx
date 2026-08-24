import { useCallback, useEffect, useState } from 'react';

import * as S from './styled';
import { CommentForm, type ReplyTarget } from './CommentForm';
import { CommentItem } from './CommentItem';
import type { CommentNode } from '@/lib/comments/types';

type Props = {
  slug: string;
};

const countAll = (nodes: CommentNode[]): number =>
  nodes.reduce((sum, node) => sum + 1 + node.replies.length, 0);

export const Comments = ({ slug }: Props) => {
  const [comments, setComments] = useState<CommentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [replyTo, setReplyTo] = useState<ReplyTarget | null>(null);

  // SSG 페이지이므로 마운트 후 클라이언트에서 불러온다.
  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { comments: CommentNode[] };
      setComments(data.comments);
      setLoadError('');
    } catch {
      setLoadError('댓글을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReply = (target: CommentNode) => {
    setReplyTo({
      // 답글에 답글을 달면 부모를 최상위 조상으로 승격시켜 깊이를 1단계로 유지한다.
      parentId: target.parentId ?? target.id,
      nickname: target.nickname,
      mention: target.parentId !== null,
    });
  };

  return (
    <S.CommentsContainer>
      <S.Heading>
        댓글
        {!loading && <S.Count>{countAll(comments)}</S.Count>}
      </S.Heading>

      {loading && <S.Empty>불러오는 중…</S.Empty>}
      {loadError && <S.Message error>{loadError}</S.Message>}

      {!loading && !loadError && comments.length === 0 && (
        <S.Empty>아직 댓글이 없습니다.</S.Empty>
      )}

      {comments.length > 0 && (
        <S.List>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onChanged={load}
            />
          ))}
        </S.List>
      )}

      <CommentForm
        slug={slug}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
        onCreated={load}
      />

      <S.Notice>
        스팸 방지를 위해 접속 IP의 일부를 변환한 값이 7일간 보관됩니다.
      </S.Notice>
    </S.CommentsContainer>
  );
};
