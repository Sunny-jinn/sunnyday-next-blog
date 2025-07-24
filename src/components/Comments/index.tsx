'use client';

import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { supabase } from '@/lib/supabaseClient'; // Supabase 클라이언트 임포트
import { formatDate } from '@/api/date';

interface Comment {
  id: string;
  name: string;
  nickname: string;
  content: string;
  created_at: string;
  // password와 post_id는 클라이언트에 표시하지 않으므로 여기에 포함하지 않습니다.
}

interface CommentsProps {
  postId: string; // 어떤 게시물에 대한 댓글인지 식별하기 위한 post_id
}

export const Comments = ({ postId }: CommentsProps) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState(''); // 사용자에게 보여줄 메시지 (작성 폼)
  const [comments, setComments] = useState<Comment[]>([]); // 불러온 댓글 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  // 댓글 불러오기 함수
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('id, name, nickname, content, created_at') // 필요한 컬럼만 선택
        .eq('post_id', postId) // 현재 postId와 일치하는 댓글만 필터링
        .order('created_at', { ascending: true }); // 작성일 기준으로 오름차순 정렬

      if (error) {
        console.error('Error fetching comments:', error);
        setError('댓글을 불러오는 데 실패했습니다.');
      } else {
        setComments(data || []);
      }
    } catch (err) {
      console.error('Unexpected error fetching comments:', err);
      setError('알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 또는 postId 변경 시 댓글 불러오기
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // 메시지 초기화

    // 간단한 유효성 검사
    if (!name || !password || !content) {
      setMessage('모든 필드를 채워주세요.');
      return;
    }

    try {
      const { error } = await supabase.from('comments').insert([
        {
          name,
          nickname,
          password,
          content,
          post_id: postId, // props로 받은 post_id 사용
        },
      ]);

      if (error) {
        console.error('Error inserting comment:', error);
        setMessage(`댓글 작성 실패: ${error.message}`);
      } else {
        setMessage('댓글이 성공적으로 작성되었습니다!');
        // 폼 초기화
        setName('');
        setNickname('');
        setPassword('');
        setContent('');
        // 댓글 작성 후 목록 새로고침
        fetchComments();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (commentId: string) => {
    setDeleteMessage('');
    if (!deletePassword) {
      setDeleteMessage('비밀번호를 입력하세요.');
      return;
    }

    try {
      const { data: commentToDelete, error: fetchError } = await supabase
        .from('comments')
        .select('password')
        .eq('id', commentId)
        .single();

      if (fetchError || !commentToDelete) {
        console.error('Error fetching comment for deletion:', fetchError);
        setDeleteMessage('댓글을 찾을 수 없습니다.');
        return;
      }

      if (commentToDelete.password !== deletePassword) {
        setDeleteMessage('비밀번호가 일치하지 않습니다.');
        return;
      }

      const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('post_id', postId);

      if (deleteError) {
        console.error('Error deleting comment:', deleteError);
        setDeleteMessage(`삭제 실패: ${deleteError.message}`);
      } else {
        setDeleteMessage('댓글이 삭제되었습니다.');
        setDeletingCommentId(null);
        setDeletePassword('');
        fetchComments();
      }
    } catch (err) {
      console.error('Unexpected error during deletion:', err);
      setDeleteMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <S.Wrapper>
      <S.Title>Comments - {comments.length}</S.Title>

      <S.CommentList>
        {!loading &&
          comments.map(comment => (
            <S.CommentItem key={comment.id}>
              <S.CommentHeader>
                <S.CommentNickname>
                  {comment.nickname || comment.name}
                </S.CommentNickname>
                <S.CommentDate>{formatDate(comment.created_at)}</S.CommentDate>
                <S.DeleteButton
                  onClick={() => {
                    setDeletingCommentId(
                      deletingCommentId === comment.id ? null : comment.id,
                    );
                    setDeletePassword('');
                    setDeleteMessage('');
                  }}
                >
                  삭제
                </S.DeleteButton>
              </S.CommentHeader>
              <S.CommentContent>{comment.content}</S.CommentContent>
              {deletingCommentId === comment.id && (
                <S.DeleteForm
                  onSubmit={e => {
                    e.preventDefault();
                    handleDelete(comment.id);
                  }}
                >
                  <S.Input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    autoFocus
                  />
                  <S.DeleteConfirmButton type="submit">
                    확인
                  </S.DeleteConfirmButton>
                  <S.DeleteCancelButton
                    type="button"
                    onClick={() => setDeletingCommentId(null)}
                  >
                    취소
                  </S.DeleteCancelButton>
                  {deleteMessage && (
                    <S.DeleteMessage>{deleteMessage}</S.DeleteMessage>
                  )}
                </S.DeleteForm>
              )}
            </S.CommentItem>
          ))}
      </S.CommentList>
      <S.CommentForm onSubmit={handleSubmit}>
        <S.InputGroup>
          <S.Input
            type="text"
            id="name"
            placeholder="이름 (저한테만 보여요)"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <S.Input
            type="text"
            id="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <S.Input
            type="password"
            id="password"
            placeholder="비밀번호 (삭제할 때 필요해요)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Textarea
            id="content"
            placeholder="댓글을 입력해주세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </S.InputGroup>
        <S.SubmitButton type="submit">댓글 작성</S.SubmitButton>
      </S.CommentForm>
    </S.Wrapper>
  );
};
