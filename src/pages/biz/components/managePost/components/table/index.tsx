import styled from "styled-components";
import CheckboxSVG from "@assets/icons/checkbox_gray.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import StarSVG from "@assets/icons/star.svg?react";
import CaretDownSVG from "@assets/icons/caret_down.svg?react";
import { useEffect, useState } from "react";
import RecruitRow from "./components/recruitRow";
import NoPost from "./components/noPost";
import StarMarkedSVG from "@assets/icons/star_marked.svg?react";
import CaretUpSVG from "@assets/icons/caret_up.svg?react";

export interface Recruit {
  id: number;
  isFavorite: boolean;
  title: string;
  applyCount: number;
  status: string;
  recruitEnd: string;
}

interface TableProps {
  recruits: Recruit[];
  onClickCheckbox: (id: number) => void;
  selectedRecruitIds: number[];
}

const Table = ({
  recruits,
  onClickCheckbox,
  selectedRecruitIds,
}: TableProps) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isStarAll, setIsStarAll] = useState(false);
  const [starMarkedIds, setStarMarkedIds] = useState<number[]>([]);
  const [sortedRecruits, setSortedRecruits] = useState<Recruit[]>([]);
  const [isCountAsc, setIsCountAsc] = useState(true);
  const [isDateAsc, setIsDateAsc] = useState(true);
  const [isStatusAsc, setIsStatusAsc] = useState(true);

  const orderAsc = ["TEMP", "RECRUIT", "CLOSED"];
  const orderDesc = [...orderAsc].reverse();

  const handleCountSortClick = () => {
    setIsCountAsc((prev) => !prev);

    if (isCountAsc) {
      setSortedRecruits((prev) =>
        prev.sort((a, b) => a.applyCount - b.applyCount)
      );
    } else {
      setSortedRecruits((prev) =>
        prev.sort((a, b) => b.applyCount - a.applyCount)
      );
    }
  };

  const handleDateSortClick = () => {
    setIsDateAsc((prev) => !prev);

    if (isDateAsc) {
      setSortedRecruits((prev) =>
        prev.sort(
          (a, b) =>
            new (Date as any)(a.recruitEnd) - new (Date as any)(b.recruitEnd)
        )
      );
    } else {
      setSortedRecruits((prev) =>
        prev.sort(
          (a, b) =>
            new (Date as any)(b.recruitEnd) - new (Date as any)(a.recruitEnd)
        )
      );
    }
  };

  const handleCheckboxClick = () => {
    setIsCheckedAll((prev) => !prev);
    recruits.map(({ id }) => onClickCheckbox(id));
  };

  const handleAllStarClick = () => {
    setIsStarAll((prev) => !prev);
    if (!isStarAll) {
      setStarMarkedIds(recruits.map(({ id }) => id));
    } else {
      setStarMarkedIds([]);
    }
  };

  const handleStatusSortClick = () => {
    setIsStatusAsc((prev) => !prev);

    if (isStatusAsc) {
      setSortedRecruits((prev) =>
        prev.sort(
          (a, b) => orderAsc.indexOf(a.status) - orderAsc.indexOf(b.status)
        )
      );
    } else {
      setSortedRecruits((prev) =>
        prev.sort(
          (a, b) => orderDesc.indexOf(a.status) - orderDesc.indexOf(b.status)
        )
      );
    }
  };

  const handleStarClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    recruitId: number
  ) => {
    e.stopPropagation();
    if (starMarkedIds.includes(recruitId)) {
      setStarMarkedIds((prev) => prev.filter((id) => id !== recruitId));
    } else {
      setStarMarkedIds((prev) => [...prev, recruitId]);
    }
  };

  useEffect(() => {
    if (
      selectedRecruitIds.length !== 0 &&
      selectedRecruitIds.length === recruits.length
    ) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  }, [selectedRecruitIds, recruits]);

  useEffect(() => {
    if (
      starMarkedIds.length !== 0 &&
      starMarkedIds.length === recruits.length
    ) {
      setIsStarAll(true);
    } else {
      setIsStarAll(false);
    }
  }, [starMarkedIds, recruits]);

  useEffect(() => {
    if (recruits.length > 0) {
      setSortedRecruits(recruits);
      const favoriteIds = recruits
        .filter((recruit) => recruit.isFavorite)
        .map((recruit) => recruit.id);

      setStarMarkedIds(favoriteIds);
    }
  }, [recruits]);

  return (
    <TableContainer>
      <Header>
        <CheckboxColumn>
          <CheckboxWrapper onClick={handleCheckboxClick}>
            {isCheckedAll ? <CheckboxCheckedSVG /> : <CheckboxSVG />}
          </CheckboxWrapper>
          <StarWrapper onClick={handleAllStarClick}>
            {isStarAll ? <StarMarkedSVG /> : <StarSVG />}
          </StarWrapper>
        </CheckboxColumn>
        <PostTitleColumn>공고명</PostTitleColumn>
        <ApplicantColumn onClick={handleCountSortClick}>
          지원 건수
          <CaretWrapper>
            {isCountAsc ? <CaretDownSVG /> : <CaretUpSVG />}
          </CaretWrapper>
        </ApplicantColumn>
        <DateColumn onClick={handleDateSortClick}>
          마감일
          <CaretWrapper>
            {isDateAsc ? <CaretDownSVG /> : <CaretUpSVG />}
          </CaretWrapper>
        </DateColumn>
        <StateColumn onClick={handleStatusSortClick}>
          상태
          <CaretWrapper>
            {isStatusAsc ? <CaretDownSVG /> : <CaretUpSVG />}
          </CaretWrapper>
        </StateColumn>
      </Header>
      <Body>
        {sortedRecruits?.map(
          ({ title, id, applyCount, recruitEnd, status }) => (
            <RecruitRow
              key={id}
              title={title}
              id={id}
              applyCount={applyCount}
              recruitEnd={recruitEnd}
              status={status}
              isFavorite={starMarkedIds.includes(id)}
              onClickStar={(e, id) => handleStarClick(e, id)}
              isSelected={selectedRecruitIds.includes(id)}
              onClickCheckbox={onClickCheckbox}
            />
          )
        )}
        {recruits.length === 0 && <NoPost />}
      </Body>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  width: 1100px;
  height: 638px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  border: 1px solid #e1e2d4;
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  background-color: #f4f4f5;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  padding: 14px 24px;
  gap: 16px;
`;

const CheckboxColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 36px;
  padding: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const CaretWrapper = styled.div``;

const PostTitleColumn = styled.div`
  display: flex;
  align-items: center;
  width: 564px;
  height: 36px;
  cursor: pointer;
`;

const ApplicantColumn = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  cursor: pointer;
`;

const DateColumn = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  cursor: pointer;
`;

const StateColumn = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;
