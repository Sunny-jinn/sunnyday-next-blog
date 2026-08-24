import { useState } from 'react';

import * as S from './styled';
import { DeleteDialog } from './DeleteDialog';
import type { CommentNode } from '@/lib/comments/types';

const formatTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

type Props = {
  comment: CommentNode;
  isReply?: boolean;
  onReply: (target: CommentNode) => void;
  onChanged: () => void;
};

export const CommentItem = ({ comment, isReply, onReply, onChanged }: Props) => {
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <S.Item isReply={isReply}>
        {comment.deleted ? (
          <S.Deleted>삭제된 댓글입니다.</S.Deleted>
        ) : (
          <>
            <S.ItemHead>
              <S.Nickname>{comment.nickname}</S.Nickname>
              {comment.isOwner && <S.OwnerBadge>글쓴이</S.OwnerBadge>}
              <S.Time dateTime={comment.createdAt}>
                {formatTime(comment.createdAt)}
              </S.Time>
            </S.ItemHead>

            <S.Body>{comment.body}</S.Body>

            <S.Actions>
              {/*
                답글에도 답글 버튼을 노출한다.
                단 parentId 를 최상위 조상으로 올려 깊이는 1단계로 유지한다.
              */}
              <S.TextButton type="button" onClick={() => onReply(comment)}>
                답글
              </S.TextButton>
              <S.TextButton type="button" onClick={() => setDeleting(v => !v)}>
                삭제
              </S.TextButton>
            </S.Actions>

            {deleting && (
              <DeleteDialog
                commentId={comment.id}
                onCancel={() => setDeleting(false)}
                onDeleted={() => {
                  setDeleting(false);
                  onChanged();
                }}
              />
            )}
          </>
        )}
      </S.Item>

      {comment.replies.map(reply => (
        <CommentItem
          key={reply.id}
          comment={reply}
          isReply
          onReply={onReply}
          onChanged={onChanged}
        />
      ))}
    </>
  );
};
