import styled from "styled-components";
import SearchSVG from "@assets/icons/search.svg?react";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/button";
import Table from "./components/table";
import PassSVG from "@assets/icons/pass.svg?react";
import FailSVG from "@assets/icons/fail.svg?react";
import { requestApplications, requestChangingApplyState } from "@/api/biz";

type ApplyStatus =
  | "APPLIED"
  | "DOCUMENT_PASSED"
  | "FINAL_ACCEPTED"
  | "REJECTED"
  | "CANCEL"
  | "전체"
  | "미열람";

const Applicant = () => {
  const [selectedFilter, setSelectedFilter] = useState<ApplyStatus>("전체");
  const [applications, setApplications] = useState([]);
  const [selectedApplyIds, setSelectedApplyIds] = useState<number[]>([]);

  const handleFilterClick = (filter: ApplyStatus) => {
    setSelectedFilter(filter);
  };

  // 임시 applied 로직!!
  const handlePassClick = async () => {
    const requestStatus = (status: ApplyStatus) => {
      switch (status) {
        case "APPLIED":
          return "DOCUMENT_PASSED";
        case "DOCUMENT_PASSED":
          return "FINAL_ACCEPTED";
        default:
          return "";
      }
    };
    const applyStatus = requestStatus("APPLIED");
    await requestChangingApplyState({
      applyIds: `${selectedApplyIds}`,
      applyStatus,
    });
    setSelectedApplyIds([]);
    getApplications();
  };

  const handleFailClick = async () => {
    await requestChangingApplyState({
      applyIds: `${selectedApplyIds}`,
      applyStatus: "REJECTED",
    });
  };

  const getApplications = async () => {
    const res = await requestApplications({ limit: "10", offset: "0" });
    console.log(res.applications);

    if (res.applications) {
      setApplications(res.applications);
    }
  };

  const handleCheckboxClick = (id: number) => {
    if (selectedApplyIds.includes(id)) {
      setSelectedApplyIds((prev) => {
        const newArray = prev.filter((applyId) => applyId !== id);
        return newArray;
      });
    } else {
      setSelectedApplyIds([...selectedApplyIds, id]);
    }
  };

  const filterByApplyStatus = (status: ApplyStatus) => {
    const filteredArray = applications.filter(
      (application) => application["applyStatus"] === status
    );

    return filteredArray;
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <ApplicantContainer>
      <TitleWrapper>
        <Title>지원자 관리</Title>
        <Searchbar>
          <SearchSVG />
          <SearchInput placeholder="지원자명, 공고명으로 검색" />
        </Searchbar>
      </TitleWrapper>
      <FilterWrapper>
        <Filters>
          <Option
            onClick={() => handleFilterClick("전체")}
            $isSelected={selectedFilter === "전체"}
          >
            전체 ({applications.length})
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("미열람")}
            $isSelected={selectedFilter === "미열람"}
          >
            미열람
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("DOCUMENT_PASSED")}
            $isSelected={selectedFilter === "DOCUMENT_PASSED"}
          >
            서류합격 ({filterByApplyStatus("DOCUMENT_PASSED").length})
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("FINAL_ACCEPTED")}
            $isSelected={selectedFilter === "FINAL_ACCEPTED"}
          >
            최종합격 ({filterByApplyStatus("FINAL_ACCEPTED").length})
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("REJECTED")}
            $isSelected={selectedFilter === "REJECTED"}
          >
            불합격({filterByApplyStatus("REJECTED").length})
          </Option>
        </Filters>
        <ButtonsWrapper>
          <Button
            variation="outlined"
            btnClass="assistive"
            onClick={handlePassClick}
            width={71}
            height={32}
            fontSize={13}
            lineHeight={138.5}
            letterSpacing={1.94}
            padding="8px 14px"
          >
            <IconWrapper>
              <PassSVG />
            </IconWrapper>
            합격
          </Button>
          <Button
            variation="outlined"
            btnClass="assistive"
            onClick={handleFailClick}
            width={71}
            height={32}
            fontSize={13}
            lineHeight={138.5}
            letterSpacing={1.94}
            padding="8px 14px"
          >
            <IconWrapper>
              <FailSVG />
            </IconWrapper>
            반려
          </Button>
        </ButtonsWrapper>
      </FilterWrapper>
      <Table
        applications={
          selectedFilter === "전체"
            ? applications
            : filterByApplyStatus(selectedFilter)
        }
        onClickCheckbox={(id: number) => handleCheckboxClick(id)}
        selectedApplyIds={selectedApplyIds}
      />
    </ApplicantContainer>
  );
};

export default Applicant;

const ApplicantContainer = styled.div`
  width: 1180px;
  padding: 24px 40px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
`;

const Searchbar = styled.div`
  width: 332px;
  height: 40px;
  padding: 8px 10px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  border: 1px solid #e0e0e2;
`;

const SearchInput = styled.input`
  width: 280px;
  height: 24px;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;

  &::placeholder {
    color: #dadada;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const Filters = styled.div`
  width: 550px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e1e2e4;

  display: flex;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  color: #171719;
  font-weight: ${({ $isSelected }) =>
    $isSelected ? "var(--font-bold)" : "var(--font-regular)"};
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "#f4f4f5" : "white")};

  &:first-child {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const FilterDivider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #e1e2e4;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const IconWrapper = styled.div`
  margin-right: 2px;
  display: flex;
  align-items: center;
`;
