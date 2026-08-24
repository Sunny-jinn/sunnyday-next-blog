import styled from '@emotion/styled';

export const CommentsContainer = styled.section`
  width: 100%;
  margin: 64px 0 96px;
  font-size: 15px;
  line-height: 1.6;
`;

export const Heading = styled.h2`
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 700;
`;

export const Count = styled.span`
  margin-left: 6px;
  opacity: 0.5;
  font-weight: 400;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0 0 32px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Item = styled.li<{ isReply?: boolean }>`
  padding: 14px 0;
  padding-left: ${({ isReply }) => (isReply ? '28px' : '0')};
  border-top: 1px solid rgba(128, 128, 128, 0.2);
`;

export const ItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`;

export const Nickname = styled.strong`
  font-size: 14px;
  font-weight: 700;
`;

export const OwnerBadge = styled.span`
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(120, 160, 90, 0.25);
`;

export const Time = styled.time`
  font-size: 12px;
  opacity: 0.5;
`;

export const Body = styled.p`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const Deleted = styled.p`
  margin: 0;
  opacity: 0.45;
  font-style: italic;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const TextButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  opacity: 0.55;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
`;

export const Textarea = styled.textarea`
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  resize: vertical;
`;

/** 허니팟. 봇만 채우도록 시각적으로 완전히 숨긴다. */
export const Honeypot = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Submit = styled.button`
  padding: 10px 20px;
  border: 0;
  border-radius: 6px;
  background: #2f3b25;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const ReplyChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  opacity: 0.75;
`;

export const Notice = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
  opacity: 0.5;
`;

export const Message = styled.p<{ error?: boolean }>`
  margin: 0;
  font-size: 13px;
  color: ${({ error }) => (error ? '#c0392b' : 'inherit')};
`;

export const DeletePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 6px;
`;

export const Empty = styled.p`
  margin: 0 0 32px;
  opacity: 0.5;
`;
