import { useEffect, useRef, useState } from 'react';

import * as S from './styled';
import { Turnstile } from './Turnstile';

export type ReplyTarget = {
  /** 서버에 보낼 parentId — 항상 최상위 조상 */
  parentId: number;
  /** 화면 표시 및 @멘션 프리필용 */
  nickname: string;
  /** 프리필을 붙일지 (최상위 댓글에 다는 답글이면 false) */
  mention: boolean;
};

type Props = {
  slug: string;
  replyTo: ReplyTarget | null;
  onCancelReply: () => void;
  onCreated: () => void;
};

export const CommentForm = ({ slug, replyTo, onCancelReply, onCreated }: Props) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [body, setBody] = useState('');
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  // 제출할 때마다 Turnstile 을 다시 그려 새 토큰을 받는다.
  const [widgetKey, setWidgetKey] = useState(0);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!replyTo) return;

    if (replyTo.mention) {
      const mention = `@${replyTo.nickname} `;
      setBody(prev => (prev.startsWith(mention) ? prev : mention + prev));
    }

    bodyRef.current?.focus();
    bodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [replyTo]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          parentId: replyTo?.parentId ?? null,
          nickname,
          password,
          body,
          website,
          turnstileToken: token,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? '댓글을 남기지 못했습니다.');
        return;
      }

      setBody('');
      setPassword('');
      setToken('');
      setWidgetKey(key => key + 1);
      onCancelReply();
      onCreated();
    } catch {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setPending(false);
    }
  };

  return (
    <S.Form onSubmit={submit}>
      {replyTo && (
        <S.ReplyChip>
          <span>답글 대상: {replyTo.nickname}</span>
          <S.TextButton type="button" onClick={onCancelReply}>
            취소
          </S.TextButton>
        </S.ReplyChip>
      )}

      <S.Row>
        <S.Input
          value={nickname}
          onChange={event => setNickname(event.target.value)}
          placeholder="닉네임"
          maxLength={20}
          required
        />
        <S.Input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="비밀번호 (삭제할 때 사용)"
          minLength={4}
          maxLength={64}
          autoComplete="off"
          required
        />
      </S.Row>

      <S.Textarea
        ref={bodyRef}
        value={body}
        onChange={event => setBody(event.target.value)}
        placeholder="댓글을 남겨주세요"
        maxLength={500}
        required
      />

      <S.Honeypot aria-hidden="true">
        <label htmlFor="website">website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={event => setWebsite(event.target.value)}
        />
      </S.Honeypot>

      {error && <S.Message error>{error}</S.Message>}

      <S.FormFooter>
        <Turnstile key={widgetKey} onToken={setToken} />
        <S.Submit type="submit" disabled={pending}>
          {pending ? '등록 중…' : '등록'}
        </S.Submit>
      </S.FormFooter>
    </S.Form>
  );
};
