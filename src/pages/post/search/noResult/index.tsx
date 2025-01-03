import styled from "styled-components";
import NoResultSVG from "@assets/icons/noresult.svg?react";

const NoResult = () => {
  return (
    <NoResultContainer>
      <NoResultSVG />
      <MainText>검색 결과가 없습니다.</MainText>
      <SubText>키워드나, 내용을 변경하여 검색해보세요!</SubText>
    </NoResultContainer>
  );
};

export default NoResult;

const NoResultContainer = styled.div`
  width: 920px;
  height: 350px;
  background-color: #f7f7f8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const MainText = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
  color: #000000;
  margin-bottom: 8px;
`;

const SubText = styled.div`
  font-size: 16px;
  font-weight: var() (--font-regular);
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #989ba2;
`;
