import styled from '@emotion/styled';
import { MOBILE_MEDIA_QUERY, TABLET_MEDIA_QUERY } from '@/styles/Global';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 863px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 130px;
  padding-bottom: 100px;

  @media ${TABLET_MEDIA_QUERY} {
    max-width: 600px;
    padding: 130px 20px;
  }

  ol {
    list-style-type: decimal;
    list-style: decimal;
  }

  ul {
    list-style-type: disc;
    list-style: disc;
  }

  ol,
  ul {
    padding-left: 20px;
  }
`;

export const TempHeader = styled.div`
  width: 100%;
  height: 60px;
  background: #ecf4d6;
  position: fixed;
  top: 0;
  z-index: 2;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  display: flex;
  padding: 20px 0;
  border-top: 0.3px solid #aaa;
  transition: 0.5s;

  &:hover {
    background: #e1e9ca;
  }
`;

export const Img = styled.div`
  display: flex;
  align-items: center;

  @media ${MOBILE_MEDIA_QUERY} {
    display: none;
  }
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
  padding: 0 10px;
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
    width: 100%;
    max-width: 300px;
  }

  @media screen and (max-width: 574px) {
    width: 100%;
    max-width: 260px;
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
