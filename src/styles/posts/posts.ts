import styled from '@emotion/styled';
import { TABLET_MEDIA_QUERY } from '@/styles/Global';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 130px;
`;

export const Container = styled.div`
  position: relative;
  width: 900px;
  height: 170px;
  display: flex;
  padding: 20px 0;
  border-top: 0.3px solid #aaa;
  transition: 0.5s;

  @media ${TABLET_MEDIA_QUERY} {
    width: 600px;
    padding: 20px 10px;
  }

  &:hover {
    background: #e1e9ca;
  }
`;

export const Img = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

export const Categories = styled.div`
  display: flex;
  margin-bottom: 60px;
`;

export const Category = styled.div`
  text-align: center;
  min-width: 80px;

  &:hover {
    color: #265073;
  }
`;

export const PostTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
`;

export const PostTitleText = styled.div`
  width: 630px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${TABLET_MEDIA_QUERY} {
    width: 300px;
  }
`;

export const PostDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #777;
  margin-left: auto;
`;

export const PostExcerpt = styled.div`
  width: 100%;
`;
