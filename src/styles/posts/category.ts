import { TABLET_MEDIA_QUERY } from '@/styles/Global';
import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 130px;
  padding-bottom: 100px;

  @media ${TABLET_MEDIA_QUERY} {
    max-width: 600px;
    padding: 130px 20px 130px 20px;
  }

  // 블로그 내부 하이퍼링크 스타일 추가
  // Footer에는 영향 가지 않게 mdx 관련 태그 내부 a 태그에만 스타일 추가함
  p,
  h1,
  h2,
  h3 {
    & > a {
      text-decoration: underline;
      color: #265073;
      font-weight: 500;
    }
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

export const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 1.2;
  margin: 6px 0;
`;

export const PostCategory = styled.div`
  font-style: italic;
  color: #265073;
  cursor: pointer;
  position: relative;
  display: inline-block;

  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    background: #265073;
    transition:
      width 0.3s ease 0s,
      left 0.3s ease 0s;
    width: 0;
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

export const PostDate = styled.div`
  font-size: 14px;
  color: #444;
  margin-bottom: 40px;
`;

export const PostLine = styled.div`
  width: 100%;
  border-top: 1px solid #bbb;
  margin-bottom: 40px;
`;
