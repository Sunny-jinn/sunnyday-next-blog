import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  color: #402e32;
  line-height: 2;
  font-size: 18px;
  border: 10px solid #7d1300;
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 100px;
`;

export const AboutCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

export const PrivacyCard = styled.div`
  font-weight: bold;
  margin-left: 30px;
`;

export const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

export const Title = styled.div`
  background: #7d1300;
  padding: 2px 15px;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  position: absolute;
  top: -57px;
  left: -1px;
`;
