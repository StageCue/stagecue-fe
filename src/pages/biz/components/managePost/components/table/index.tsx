/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import CheckboxSVG from '@assets/icons/checkbox_gray.svg?react';
import CheckboxCheckedSVG from '@assets/icons/checkbox_checked.svg?react';
import StarSVG from '@assets/icons/star.svg?react';
import CaretDownSVG from '@assets/icons/caret_down.svg?react';
import { useEffect, useState } from 'react';
import RecruitRow from './components/recruitRow';
import NoPost from './components/noPost';
import StarMarkedSVG from '@assets/icons/star_marked.svg?react';
import CaretUpSVG from '@assets/icons/caret_up.svg?react';
import { Recruit } from '@/types/biz';
import { PostSortType, usePostListContext } from '../context';

interface TableProps {
  recruits: Recruit[];
  onClickCheckbox: (id: number) => void;
  onClickAllCheckbox: (value: boolean) => void;
  selectedRecruitIds: number[];
}

const Table = ({
  recruits,
  onClickCheckbox,
  onClickAllCheckbox,
  selectedRecruitIds,
}: TableProps) => {
  const { sort, setSort, sortDirection, setSortDirection, favoriteFilter, setFavoriteFilter } =
    usePostListContext();

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [starMarkedIds, setStarMarkedIds] = useState<number[]>([]);

  const handleSortClick = (field: PostSortType) => {
    if (sort !== field) {
      setSort(field);
      setSortDirection('ASC');
    } else {
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    }
  };

  const handleCheckboxClick = () => {
    onClickAllCheckbox(!isCheckedAll);
    setIsCheckedAll(prev => !prev);
  };

  const handleAllStarClick = () => {
    setFavoriteFilter(prev => !(prev ?? false));
  };

  const handleStarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, recruitId: number) => {
    e.stopPropagation();
    if (starMarkedIds.includes(recruitId)) {
      setStarMarkedIds(prev => prev.filter(id => id !== recruitId));
    } else {
      setStarMarkedIds(prev => [...prev, recruitId]);
    }
  };

  useEffect(() => {
    if (selectedRecruitIds?.length !== 0 && selectedRecruitIds?.length === recruits.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  }, [selectedRecruitIds, recruits]);

  useEffect(() => {
    if (recruits?.length > 0) {
      const favoriteIds = recruits.filter(recruit => recruit.isFavorite).map(recruit => recruit.id);

      setStarMarkedIds(favoriteIds);
    }
  }, [recruits]);

  return (
    <TableContainer>
      <Header>
        <CheckboxColumn>
          <CheckboxWrapper onClick={handleCheckboxClick}>
            {isCheckedAll ? (
              <CheckboxCheckedSVG width={28} height={28} />
            ) : (
              <CheckboxSVG width={28} height={28} />
            )}
          </CheckboxWrapper>
          <StarWrapper onClick={handleAllStarClick}>
            {favoriteFilter ? <StarMarkedSVG /> : <StarSVG />}
          </StarWrapper>
        </CheckboxColumn>
        <PostTitleColumn>공고명</PostTitleColumn>
        <ApplicantColumn onClick={() => handleSortClick('APPLY_COUNT')}>
          지원 건수
          <CaretWrapper>
            {sort === 'APPLY_COUNT' && sortDirection === 'ASC' ? <CaretUpSVG /> : <CaretDownSVG />}
          </CaretWrapper>
        </ApplicantColumn>
        <DateColumn onClick={() => handleSortClick('END_DATE')}>
          마감일
          <CaretWrapper>
            {sort === 'END_DATE' && sortDirection === 'ASC' ? <CaretUpSVG /> : <CaretDownSVG />}
          </CaretWrapper>
        </DateColumn>
        <StateColumn>상태</StateColumn>
      </Header>
      <Body>
        {recruits?.map(
          ({ title, id, applyCount, recruitEndDate: recruitEnd, recruitStatus: status }) => (
            <RecruitRow
              key={id}
              title={title}
              id={id}
              applyCount={applyCount}
              recruitEnd={recruitEnd}
              status={status}
              isFavorite={starMarkedIds.includes(id)}
              onClickStar={(e, id) => handleStarClick(e, id)}
              isSelected={selectedRecruitIds?.includes(id)}
              onClickCheckbox={onClickCheckbox}
            />
          )
        )}
        {recruits?.length === 0 && <NoPost />}
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
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
