import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.color.white_100};
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top: 1px solid ${props => props.theme.color.gray_300};
  background-color: ${props => props.theme.color.background};
  margin-top: 50px;
  padding-top: 30px;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white_100};

  &:focus {
    outline: none;
    background-color: ${props => props.theme.color.background};

    border-color: ${props => props.theme.color.celeste_100};
  }
`;

export const Textarea = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.white_100};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.celeste_100};
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: ${props => props.theme.color.celeste_100};
  color: ${props => props.theme.color.gray_400};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.color.celeste_200};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const Message = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: red;
  text-align: center;
`;

export const CommentList = styled.div`
  margin-top: 30px;
  padding-top: 20px;
`;

export const CommentItem = styled.div`
  background-color: ${props => props.theme.color.gray_300};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const CommentNickname = styled.span`
  color: ${props => props.theme.color.celeste_100};
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: ${props => props.theme.color.gray_100};
`;

export const CommentContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${props => props.theme.color.white_100};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.color.gray_100};
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;

  &:hover {
    color: ${props => props.theme.color.white_100};
  }
`;

export const DeleteForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const DeleteConfirmButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.theme.color.celeste_100};
  color: ${props => props.theme.color.gray_400};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const DeleteCancelButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.theme.color.gray_200};
  color: ${props => props.theme.color.white_100};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const DeleteMessage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.color.celeste_100};
`;
