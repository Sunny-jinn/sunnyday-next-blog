import { useState } from 'react';

import * as S from './styled';
import { Turnstile } from './Turnstile';

type Props = {
  commentId: number;
  onCancel: () => void;
  onDeleted: () => void;
};

export const DeleteDialog = ({ commentId, onCancel, onDeleted }: Props) => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async () => {
    setPending(true);
    setError('');

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, turnstileToken: token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? '삭제하지 못했습니다.');
        return;
      }

      onDeleted();
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setPending(false);
    }
  };

  return (
    <S.DeletePanel>
      <S.Input
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        placeholder="작성 시 입력한 비밀번호"
        autoComplete="off"
      />
      <Turnstile onToken={setToken} />
      {error && <S.Message error>{error}</S.Message>}
      <S.Actions>
        <S.TextButton type="button" onClick={submit} disabled={pending}>
          {pending ? '삭제 중…' : '삭제 확인'}
        </S.TextButton>
        <S.TextButton type="button" onClick={onCancel}>
          취소
        </S.TextButton>
      </S.Actions>
    </S.DeletePanel>
  );
};
