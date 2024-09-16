import { useState } from "react";
import styled from "styled-components";
import ChevronDownSVG from "@/assets/icons/chebron_down_s.svg?react";
import DotdotdotSVG from "@/assets/images/dotdotdot.svg?react";
import Button from "@/components/buttons/button";

type applyPhaseType = "지원 완료" | "서류 통과" | "최종 합격" | "불합격";
type filterType = "전체" | "열람" | "미열람" | "지원취소";

const ApplyHistory = () => {
  const [selectedPhase, setSelectedPhase] =
    useState<applyPhaseType>("지원 완료");
  const [selectedFilter, setSelectedFilter] = useState<filterType>("전체");
  const [isFilterMenuShowing, setIsFilterMenuShowing] =
    useState<boolean>(false);

  const handlePhaseClick = (phase: applyPhaseType) => {
    setSelectedPhase(phase);
  };

  const handleFilterClick = (filter: filterType) => {
    setSelectedFilter(filter);
    setIsFilterMenuShowing(false);
  };

  const handleFilterBtnClick = () => {
    setIsFilterMenuShowing((curr) => !curr);
  };

  return (
    <ApplyHistoryContainer>
      <ApplyDashboard>
        <ItemTitle>지원 현황</ItemTitle>
        <Dashboard>
          <ApplyPhase
            onClick={() => handlePhaseClick("지원 완료")}
            $isSelected={selectedPhase === "지원 완료"}
          >
            <ItemName>지원 완료</ItemName>
            <Value>3</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("서류 통과")}
            $isSelected={selectedPhase === "서류 통과"}
          >
            <ItemName>서류 통과</ItemName>
            <Value>3</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("최종 합격")}
            $isSelected={selectedPhase === "최종 합격"}
          >
            <ItemName>최종 합격</ItemName>
            <Value>3</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("불합격")}
            $isSelected={selectedPhase === "불합격"}
          >
            <ItemName>불합격</ItemName>
            <Value>3</Value>
          </ApplyPhase>
        </Dashboard>
      </ApplyDashboard>
      <ApplyList>
        <TitleWrapper>
          <ItemTitle>{selectedPhase}</ItemTitle>
          <FilterBtnWrapper>
            <FilterBtn onClick={handleFilterBtnClick}>
              {selectedFilter} <ChevronDownSVG />
            </FilterBtn>
            {isFilterMenuShowing && (
              <FilterMenu>
                <Option onClick={() => handleFilterClick("전체")}>전체</Option>
                <Option onClick={() => handleFilterClick("열람")}>열람</Option>
                <Option onClick={() => handleFilterClick("미열람")}>
                  미열람
                </Option>
                <Option onClick={() => handleFilterClick("지원취소")}>
                  지원취소
                </Option>
              </FilterMenu>
            )}
          </FilterBtnWrapper>
        </TitleWrapper>
        <NoApplyHistory>
          <DotdotdotSVG />
          <TextWrapper>
            <Text>아직 지원한 공고가 없어요.</Text>
            <SubText>다양한 공고들을 둘러볼까요?</SubText>
          </TextWrapper>
          <Button variation="solid" btnClass="primary" width={296}>
            공고 찾아보기
          </Button>
        </NoApplyHistory>
      </ApplyList>
    </ApplyHistoryContainer>
  );
};

export default ApplyHistory;

const ApplyHistoryContainer = styled.div`
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

const ApplyDashboard = styled.div``;

const Dashboard = styled.div`
  width: 685px;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #eaebec;
  border-radius: 12px;
`;

const ApplyPhase = styled.div<{ $isSelected: boolean }>`
  width: 147.25px;
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#007AFF" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#171719")};
  border-radius: 12px;
  cursor: pointer;
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

const ApplyList = styled.div``;

const TitleWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #f4f4f5;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const FilterBtnWrapper = styled.div`
  display: flex;
  gap: 4px;
  position: relative;
  width: 100px;
  justify-content: end;
`;

const FilterBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  color: #171719;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`;

const FilterMenu = styled.div`
  position: absolute;
  bottom: -165px;
  right: 0;
  width: 111px;
  height: 160px;
  border-radius: 10px;
  padding: 12px 10px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Option = styled.div`
  padding: 4px 6px;
  width: 91px;
  height: 28px;
  border-radius: 5px;
  color: #37383c;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  cursor: pointer;
`;

const NoApplyHistory = styled.div`
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
