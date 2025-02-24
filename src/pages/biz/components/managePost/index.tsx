import styled from "styled-components";
import SearchSVG from "@assets/icons/search.svg?react";
import TimeSVG from "@assets/icons/time.svg?react";
import CalendarSVG from "@assets/icons/calendar_s.svg?react";
import TrashSVG from "@assets/icons/trash.svg?react";
import { useState } from "react";
import Button from "@/components/buttons/button";
import Table from "./components/table";
import {
  requestChangeEndDate,
  requestCloseRecruit,
  requestDeleteRecruit,
  requestRecruits,
} from "@/api/biz";
import CloseModal from "./components/closeModal";
import DatepickerModal from "@/components/datepickerModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Paginator from "@/components/paginator";
import { Recruit } from "@/types/biz";

type ManageRecruitFilterType = "TEMP" | "RECRUIT" | "CLOSED" | "전체";

interface BizRecruitQuery {
  totalCount: number;
  recruits: Recruit[];
}

const ManagePost = () => {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] =
    useState<ManageRecruitFilterType>("전체");
  const [selectedRecruitIds, setSelectedRecruitIds] = useState<number[]>([]);
  const [isCloseRecruitModalOpen, setCloseRecruitModalOpen] = useState(false);
  const [isChangeDeadlieModalOpen, setIsChangeDeadlineModalOpen] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  const handleFilterClick = (filter: ManageRecruitFilterType) => {
    setSelectedFilter(filter);
  };

  const handleChangeDeadlineClick = () => {
    if (selectedRecruitIds.length !== 0) {
      setIsChangeDeadlineModalOpen(true);
    }
  };

  const handleCloseChangeDeadlineClick = () => {
    setIsChangeDeadlineModalOpen(false);
  };

  const handleCloseRecruitClick = () => {
    setCloseRecruitModalOpen(true);
  };

  const handleCancelClick = () => {
    setCloseRecruitModalOpen(false);
  };

  const handleDeadlineConfirm = async (endDate: string) => {
    await requestChangeEndDate({
      recruitIds: selectedRecruitIds,
      endDate,
    });

    queryClient.invalidateQueries({
      queryKey: ["bizRecruits", page, selectedFilter],
    });
  };

  const handleConfirmClick = async () => {
    await requestCloseRecruit({
      recruitIds: selectedRecruitIds,
      status: "CLOSED",
    });

    setCloseRecruitModalOpen(false);

    queryClient.invalidateQueries({
      queryKey: ["bizRecruits", page, selectedFilter],
    });
  };

  const handleCheckboxClick = (id: number) => {
    if (selectedRecruitIds.includes(id)) {
      setSelectedRecruitIds((prev) => {
        const newArray = prev.filter((recruitId) => recruitId !== id);
        return newArray;
      });
    } else {
      setSelectedRecruitIds([...selectedRecruitIds, id]);
    }
  };

  const handleDeleteClick = async () => {
    await requestDeleteRecruit({
      applyIds: `[${selectedRecruitIds}]`,
    });

    setCloseRecruitModalOpen(false);

    queryClient.invalidateQueries({
      queryKey: ["bizRecruits", page, selectedFilter],
    });
  };

  const { data } = useQuery<BizRecruitQuery>({
    queryKey: ["bizRecruits", page, selectedFilter],
    queryFn: () =>
      requestRecruits({
        limit: 10,
        offset: page * 10,
        status: selectedFilter === "전체" ? "" : selectedFilter,
      }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ManagePostContainer>
      {isCloseRecruitModalOpen && (
        <CloseModal
          onConfirm={handleConfirmClick}
          onClose={handleCancelClick}
          targetLength={selectedRecruitIds.length}
        />
      )}
      {isChangeDeadlieModalOpen && selectedRecruitIds.length !== 0 && (
        <DatepickerModal
          defaultValue={
            data?.recruits?.find((item) => item.id === selectedRecruitIds[0])
              ?.recruitEnd
          }
          onClose={handleCloseChangeDeadlineClick}
          onConfirm={handleDeadlineConfirm}
        />
      )}
      <TitleWrapper>
        <Title>공고 관리</Title>
        <Searchbar>
          <SearchSVG />
          <SearchInput placeholder="공고명으로 검색" />
        </Searchbar>
      </TitleWrapper>
      <FilterWrapper>
        <Filters>
          <Option
            onClick={() => handleFilterClick("전체")}
            $isSelected={selectedFilter === "전체"}
          >
            전체
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("TEMP")}
            $isSelected={selectedFilter === "TEMP"}
          >
            임시저장
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("RECRUIT")}
            $isSelected={selectedFilter === "RECRUIT"}
          >
            모집중
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick("CLOSED")}
            $isSelected={selectedFilter === "CLOSED"}
          >
            모집종료
          </Option>
        </Filters>
        <ButtonsWrapper>
          <Button
            variation="outlined"
            btnClass="assistive"
            width={109}
            height={32}
            fontSize={13}
            lineHeight={138.5}
            letterSpacing={1.94}
            padding="8px 14px"
            onClick={handleChangeDeadlineClick}
          >
            <IconWrapper>
              <TimeSVG />
            </IconWrapper>
            마감일 변경
          </Button>
          <Button
            variation="outlined"
            btnClass="assistive"
            onClick={handleCloseRecruitClick}
            width={98}
            height={32}
            fontSize={13}
            lineHeight={138.5}
            letterSpacing={1.94}
            padding="8px 14px"
          >
            <IconWrapper>
              <CalendarSVG />
            </IconWrapper>
            공고 마감
          </Button>
          <Button
            variation="outlined"
            btnClass="assistive"
            width={71}
            height={32}
            fontSize={13}
            lineHeight={138.5}
            letterSpacing={1.94}
            padding="8px 14px"
            onClick={handleDeleteClick}
          >
            <IconWrapper>
              <TrashSVG />
            </IconWrapper>
            삭제
          </Button>
        </ButtonsWrapper>
      </FilterWrapper>
      {data?.recruits && (
        <Table
          recruits={data.recruits}
          onClickCheckbox={handleCheckboxClick}
          selectedRecruitIds={selectedRecruitIds}
        />
      )}
      {data && (
        <Paginator
          page={page}
          totalCounts={data?.totalCount}
          itemsPerPage={10}
          pageGroupSize={5}
          onChangePage={handlePageChange}
        />
      )}
    </ManagePostContainer>
  );
};

export default ManagePost;

const ManagePostContainer = styled.div`
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
  width: 440px;
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
