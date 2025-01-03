import styled from "styled-components";
import NoScrappedSVG from "@assets/images/noscrappedd.svg?react";
import Button from "@/components/buttons/button";
import { useEffect, useState } from "react";
import { requestCastsStatus, requestScraps } from "@/api/users";
import { requestCasts } from "@/api/cast";
import Cast from "@/pages/home/components/cast";

export interface CastStatus {
  accepted: number;
  applied: number;
  passed: number;
  rejected: number;
}

const Mystage = () => {
  const [recruitsStatus, setRecruitsStatus] = useState<CastStatus>();
  const [popularRecruits, setPopularRecruits] = useState([]);
  const [scraps, setScraps] = useState([]);

  const getRecruitsStatus = async () => {
    const res = await requestCastsStatus();
    setRecruitsStatus(res);
  };

  const getPopularRecruits = async () => {
    const { casts } = await requestCasts({
      limit: "4",
      offset: "0",
      orderBy: "newest",
    });

    setPopularRecruits(casts);
  };

  const getScrappedCasts = async () => {
    const { casts } = await requestScraps({
      limit: 3,
      offset: 0,
    });

    setScraps(casts);
  };

  useEffect(() => {
    getRecruitsStatus();
    getPopularRecruits();
    getScrappedCasts();
  }, []);

  return (
    <MystageContainer>
      <MyStage>
        <ItemTitleWrapper>
          <ItemTitle>My Stage</ItemTitle>
        </ItemTitleWrapper>
        <Dashboard>
          <MyStageItem>
            <ItemName>지원 완료</ItemName>
            {recruitsStatus && (
              <Value>
                {recruitsStatus?.applied +
                  recruitsStatus?.passed +
                  recruitsStatus?.accepted +
                  recruitsStatus?.rejected}
              </Value>
            )}
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>서류 통과</ItemName>
            <Value>{recruitsStatus?.passed}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>최종 합격</ItemName>
            <Value>{recruitsStatus?.accepted}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>불합격</ItemName>
            <Value>{recruitsStatus?.rejected}</Value>
          </MyStageItem>
        </Dashboard>
      </MyStage>
      <ScrappedPost>
        <ItemTitleWrapper>
          <ItemTitle>스크랩한 공고</ItemTitle>
        </ItemTitleWrapper>
        {scraps?.length === 0 ? (
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
        ) : (
          <Scraps>
            {scraps?.map(
              ({
                recruitId,
                imageUrl,
                recruitTitle,
                artworkName,
                practiceAddress,
                isScrapping,
              }) => (
                <Cast
                  key={recruitId}
                  recruitId={recruitId}
                  thumbnail={imageUrl}
                  recruitTitle={recruitTitle}
                  artworkName={artworkName}
                  practiceLocation={practiceAddress}
                  isScrapping={isScrapping}
                />
              )
            )}
          </Scraps>
        )}
      </ScrappedPost>
      {scraps?.length === 0 && (
        <PopularPost>
          <ItemTitleWrapper>
            <ItemTitle>이번주 인기공고</ItemTitle>
            <ShowAll>전체보기</ShowAll>
          </ItemTitleWrapper>
          <Casts>
            {popularRecruits?.map(
              ({
                recruitId,
                thumbnail,
                recruitTitle,
                artworkName,
                practiceLocation,
                isScrapping,
              }) => (
                <Cast
                  key={recruitId}
                  recruitId={recruitId}
                  thumbnail={thumbnail}
                  recruitTitle={recruitTitle}
                  artworkName={artworkName}
                  practiceLocation={practiceLocation}
                  isScrapping={isScrapping}
                />
              )
            )}
          </Casts>
        </PopularPost>
      )}
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
  margin-bottom: 20px;
`;

const ShowAll = styled.div`
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 162.5%;
  color: 171719;
  font-weight: var(--font-medium);
  cursor: pointer;
`;

const Casts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  row-gap: 40px;
`;

const Scraps = styled.div`
  display: flex;
  gap: 20px;
`;
