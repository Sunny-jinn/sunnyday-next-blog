import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  color: #265073;
  line-height: 2;
  font-size: 18px;
  background-image: url('/assets/background.svg');
  background-size: 100% 100%;
  border-radius: 30px;
  padding: 60px;
  margin-bottom: -30px;
`;

export const AboutCard = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
`;

export const PrivacyCard = styled.div`
  font-weight: bold;
  margin-left: 50px;
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
  /* background: #265073; */
  padding: 2px 15px;
  border-radius: 30px;
  color: #265073;
  font-weight: bold;
  font-size: 24px;
  position: absolute;
  top: -66px;
  left: 19px;
`;
