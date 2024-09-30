import styled from "styled-components";
import NoScrappedSVG from "@assets/images/noscrappedd.svg?react";
import Button from "@/components/buttons/button";
import { useEffect, useState } from "react";
import { requestCastsStatus } from "@/api/users";

interface CastStatus {
  accepted: number;
  applied: number;
  passed: number;
  rejected: number;
}

const Mystage = () => {
  const [castsStatus, setCastStatus] = useState<CastStatus>();

  const getCastsStatus = async () => {
    const res = await requestCastsStatus();

    setCastStatus(res);
  };

  useEffect(() => {
    getCastsStatus();
  }, []);

  return (
    <MystageContainer>
      <MyStage>
        <ItemTitle>My Stage</ItemTitle>
        <Dashboard>
          <MyStageItem>
            <ItemName>지원 완료</ItemName>
            <Value>{castsStatus?.applied}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>서류 통과</ItemName>
            <Value>{castsStatus?.accepted}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>최종 합격</ItemName>
            <Value>{castsStatus?.passed}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>불합격</ItemName>
            <Value>{castsStatus?.rejected}</Value>
          </MyStageItem>
        </Dashboard>
      </MyStage>
      <ScrappedPost>
        <ItemTitle>스크랩한 공고</ItemTitle>
        <NoSavedPost>
          <NoScrappedSVG />
          <TextWrapper>
            <Text>아직 스크랩한 공고가 없어요.</Text>
            <SubText>관심있는 공고를 스크랩 해보세요!</SubText>
          </TextWrapper>
          <Button variation="solid" btnClass="primary" width={296}>
            공고 찾아보기
          </Button>
        </NoSavedPost>
      </ScrappedPost>
      <PopularPost>
        <ItemTitleWrapper>
          <ItemTitle>이번주 인기공고</ItemTitle>
          <ShowAll>전체보기</ShowAll>
        </ItemTitleWrapper>
      </PopularPost>
    </MystageContainer>
  );
};

export default Mystage;

const MystageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
  margin-bottom: 20px;
`;

const MyStage = styled.div``;

const Dashboard = styled.div`
  width: 685px;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #eaebec;
  border-radius: 12px;
`;

const MyStageItem = styled.div`
  width: 147.25px;
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: var(--font-regualr);
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const Divider = styled.div`
  width: 1px;
  height: 96px;
  background-color: #f3f3f3;
  margin: 0px 12px;
`;

const ScrappedPost = styled.div``;

const NoSavedPost = styled.div`
  width: 685px;
  height: 248px;
  padding: 28px 0;
  background-color: #f7f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const SubText = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
`;

const PopularPost = styled.div``;

const ItemTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShowAll = styled.div`
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 162.5%;
  color: 171719;
  font-weight: var(--font-medium);
  cursor: pointer;
`;
