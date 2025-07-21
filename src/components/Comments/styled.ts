import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px; /* 적절한 최대 너비 설정 */
  margin: 40px auto;
  padding: 20px;
  border-top: 1px solid #eee;
  /* background-color: #f9f9f9; */
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.color.black_100};
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => props.theme.color.background};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${props => props.theme.color.black_100};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.black_100};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.celeste_100};
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.black_100};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.color.celeste_100};
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: ${props => props.theme.color.celeste_100};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.color.celeste_100};
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
  border-top: 1px solid #eee;
  padding-top: 20px;
`;

export const CommentItem = styled.div`
  background-color: ${props => props.theme.color.background};
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentNickname = styled.span`
  font-weight: bold;
  color: ${props => props.theme.color.black_100};
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: ${props => props.theme.color.gray_200};
`;

export const CommentContent = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${props => props.theme.color.black_100};
`;
