import styled from "styled-components";
import ChevronRightSVG from "@assets/icons/chevron_right.svg?react";
import BookmarkSVG from "@assets/icons/bookmark.svg?react";
import { useState } from "react";
import BasicInfo from "../components/basicInfo";
import LocationInfo from "../components/locationInfo";
import PracticeInfo from "../components/practiceInfo";
import Application from "../components/application";

const Detail = () => {
  const [selectedTab, setSelectedTab] = useState("공연 기본 정보");

  const handleTabClick = (option: string) => {
    setSelectedTab(option);
  };
  return (
    <DetailContainer>
      <ContentWrapper>
        <Header>
          <TitleWrapper>
            <DdayWrapper>
              <Dday>D-12</Dday>
              <BookmarkWrapper>
                <BookmarkSVG />
              </BookmarkWrapper>
            </DdayWrapper>
            <Title>업템포 극단과 함께할 배우들을 모집합니다.</Title>
          </TitleWrapper>
          <Divider />
          <TroupeWrapper>
            <TroupeLogo />
            <TroupeName>
              업템포극단
              <IconWrapper>
                <ChevronRightSVG />
              </IconWrapper>
            </TroupeName>
          </TroupeWrapper>
          <PostImageSlide />
        </Header>
        <Content>
          <ContentTab>
            <Option
              onClick={() => handleTabClick("공연 기본 정보")}
              $isSelected={selectedTab === "공연 기본 정보"}
            >
              공연 기본 정보
              {selectedTab === "공연 기본 정보" && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick("공연 위치 정보")}
              $isSelected={selectedTab === "공연 위치 정보"}
            >
              공연 위치 정보
              {selectedTab === "공연 위치 정보" && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick("연습 장소 정보")}
              $isSelected={selectedTab === "연습 장소 정보"}
            >
              연습 장소 정보
              {selectedTab === "연습 장소 정보" && <SelectedBorder />}
            </Option>
          </ContentTab>
          <ContentBody>
            {selectedTab === "공연 기본 정보" && <BasicInfo />}
            {selectedTab === "공연 위치 정보" && <LocationInfo />}
            {selectedTab === "연습 장소 정보" && <PracticeInfo />}
          </ContentBody>
        </Content>
      </ContentWrapper>
      <Application />
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  margin-top: 60px;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  width: 689px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Dday = styled.div`
  width: 50px;
  height: 26px;
  background-color: #000000;
  border-radius: 4px;
  font-weight: var(--font-semibold);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2px 6px;
  font-size: 15px;
`;

const Title = styled.div`
  height: 32px;
  font-size: 24px;
  letter-spacing: -2.3%;
  line-height: 133.4%;
  font-weight: var(--font-bold);
`;

const TroupeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TroupeLogo = styled.div`
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 8px;
`;

const TroupeName = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const PostImageSlide = styled.div`
  width: 270px;
  height: 405px;
  background-color: black;
  border-radius: 8px;
`;

const Divider = styled.div`
  width: 689px;
  height: 1px;
  background-color: #f4f4f5;
`;

const ContentTab = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #f4f4f5;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  min-width: 118px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isSelected }) => ($isSelected ? "#171719" : "#999ba2")};
  cursor: pointer;
  position: relative;
`;

const SelectedBorder = styled.div`
  position: absolute;
  height: 4px;
  width: 118px;
  background-color: #b82824;
  bottom: -2px;
`;

const ContentBody = styled.div`
  width: 689px;
`;

const BookmarkWrapper = styled.div``;
