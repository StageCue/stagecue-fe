import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChevronDownSVG from '@/assets/icons/chebron_down_s.svg?react';
import ApplyList from './components/applyList';
import { useMyStageData } from '../../hooks/useMyStageData.ts';
import useHandleClickOutside from '@/hooks/useHandleClickOutside';
// import { requestApplications } from '@/api/biz/index.ts';
// import { useQuery } from '@tanstack/react-query';

export type applyPhaseType =
  | 'APPLY' // 지원완료
  | 'OPEN' // 열람
  | 'PASS' // 서류통과
  | 'WIN' // 합격
  | 'LOSE' // 불합격
  | 'CANCELED'; // 지원취소

export type filterType = '전체' | 'CANCEL' | 'READ' | 'UNREAD';

const ApplyHistory = () => {
  const { recruitsStatus } = useMyStageData();

  const [selectedPhase, setSelectedPhase] = useState<applyPhaseType>('APPLY');
  const [selectedFilter, setSelectedFilter] = useState<filterType>('전체');

  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { isOpen: isFilterMenuShowing, setIsOpen: setIsFilterMenuShowing } =
    useHandleClickOutside(buttonWrapperRef);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonWrapperRef.current && !buttonWrapperRef.current.contains(event.target as Node)) {
        setIsFilterMenuShowing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getStatusCount = (status: string) => {
    return recruitsStatus?.result?.find(item => item.applyStatus === status)?.count ?? 0;
  };

  const handlePhaseClick = (phase: applyPhaseType) => {
    setSelectedPhase(phase);
  };

  const handleFilterClick = (filter: filterType) => {
    setSelectedFilter(filter);
    setIsFilterMenuShowing(false);
  };

  const handleFilterBtnClick = () => {
    setIsFilterMenuShowing(curr => !curr);
  };

  const parsePhase = (status: applyPhaseType) => {
    switch (status) {
      case 'APPLY':
        return '지원 완료';
      case 'PASS':
        return '서류 통과';
      case 'WIN':
        return '최종 합격';
      case 'LOSE':
        return '불합격';
      case 'CANCELED':
        return '지원취소';
    }
  };

  const parseFilterText = (filter: filterType) => {
    switch (filter) {
      case '전체':
        return '전체';
      case 'READ':
        return '열람';
      case 'UNREAD':
        return '미열람';
      case 'CANCEL':
        return '지원취소';
    }
  };

  return (
    <ApplyHistoryContainer>
      <ApplyDashboard>
        <ItemTitle>지원 현황</ItemTitle>
        <Dashboard>
          <ApplyPhase
            onClick={() => handlePhaseClick('APPLY')}
            $isSelected={selectedPhase === 'APPLY'}
          >
            <ItemName>지원 완료</ItemName>
            <Value>{getStatusCount('APPLY')}</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick('PASS')}
            $isSelected={selectedPhase === 'PASS'}
          >
            <ItemName>서류 통과</ItemName>
            <Value>{getStatusCount('PASS')}</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase onClick={() => handlePhaseClick('WIN')} $isSelected={selectedPhase === 'WIN'}>
            <ItemName>최종 합격</ItemName>
            <Value>{getStatusCount('WIN')}</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick('LOSE')}
            $isSelected={selectedPhase === 'LOSE'}
          >
            <ItemName>불합격</ItemName>
            <Value>{getStatusCount('LOSE')}</Value>
          </ApplyPhase>
        </Dashboard>
      </ApplyDashboard>
      <ApplyListWrapper>
        <TitleWrapper>
          <ItemTitle>{parsePhase(selectedPhase)}</ItemTitle>
          {(selectedPhase === 'APPLY' || selectedPhase === 'CANCELED') && (
            <FilterBtnWrapper ref={buttonWrapperRef}>
              <FilterBtn onClick={handleFilterBtnClick}>
                {parseFilterText(selectedFilter)} <ChevronDownSVG />
              </FilterBtn>
              {isFilterMenuShowing && (
                <FilterMenu>
                  <Option onClick={() => handleFilterClick('전체')}>전체</Option>
                  <Option onClick={() => handleFilterClick('READ')}>열람</Option>
                  <Option onClick={() => handleFilterClick('UNREAD')}>미열람</Option>
                  <Option onClick={() => handleFilterClick('CANCEL')}>지원취소</Option>
                </FilterMenu>
              )}
            </FilterBtnWrapper>
          )}
        </TitleWrapper>
        <ApplyList status={selectedPhase} filter={selectedFilter} />
      </ApplyListWrapper>
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
  background-color: ${({ $isSelected }) => ($isSelected ? '#f0f7ff' : 'white')};
  color: ${({ $isSelected }) => ($isSelected ? '#B81716' : '#171719')};
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

const ApplyListWrapper = styled.div``;

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
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Option = styled.div`
  padding: 4px 6px;
  width: 91px;
  height: 28px;
  border-radius: 5px;
  color: #37383c9b;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;

// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import styled from 'styled-components';
// import ChevronDownSVG from '@/assets/icons/chebron_down_s.svg?react';
// import ApplyList from './components/applyList';
// import { useMyStageData } from '../../hooks/useMyStageData.ts';
// import { requestApplyList } from '@/api/cast/index.tsx';

// export type applyPhaseType =
//   | 'APPLY' // 지원완료
//   | 'OPEN' // 열람
//   | 'PASS' // 서류통과
//   | 'WIN' // 합격
//   | 'LOSE' // 불합격
//   | 'CANCELED'; // 지원취소

// export type filterType = '전체' | 'CANCEL' | 'READ' | 'UNREAD';

// interface ApplyHistory {
//   applyId: number;
//   status: string;
//   recruitTitle: string;
//   troupeName: string;
//   histories: { changeDate: string; applyStatus: string }[];
// }

// interface PagingParam {
//   number: number;
//   size: number;
//   key: number;
// }

// interface ApplyListResponse {
//   result: {
//     pagingParam: PagingParam;
//     body: ApplyHistory[];
//     isLastPage: boolean;
//   };
// }

// const ApplyHistory = () => {
//   const { recruitsStatus } = useMyStageData();

//   const [selectedPhase, setSelectedPhase] = useState<applyPhaseType>('APPLY');
//   const [selectedFilter, setSelectedFilter] = useState<filterType>('전체');
//   const [isFilterMenuShowing, setIsFilterMenuShowing] = useState<boolean>(false);
//   const [applyList, setApplyList] = useState<ApplyHistory[]>([]);

//   const getStatusCount = (status: string) => {
//     return recruitsStatus?.result?.find(item => item.applyStatus === status)?.count ?? 0;
//   };

//   const handlePhaseClick = (phase: applyPhaseType) => {
//     setSelectedPhase(phase);
//   };

//   const handleFilterClick = (filter: filterType) => {
//     setSelectedFilter(filter);

//     //TODO: api 수정 후 변경 필요 (2025.03.12)
//     if (filter === 'CANCEL') setSelectedPhase('CANCELED');
//     setIsFilterMenuShowing(false);
//   };

//   const handleFilterBtnClick = () => {
//     setIsFilterMenuShowing(curr => !curr);
//   };

//   const parsePhase = (status: applyPhaseType) => {
//     switch (status) {
//       case 'APPLY':
//         return '지원 완료';
//       case 'PASS':
//         return '서류 통과';
//       case 'WIN':
//         return '최종 합격';
//       case 'LOSE':
//         return '불합격';
//       case 'CANCELED':
//         return '지원취소';
//     }
//   };

//   const parseFilterText = (filter: filterType) => {
//     switch (filter) {
//       case '전체':
//         return '전체';
//       case 'READ':
//         return '열람';
//       case 'UNREAD':
//         return '미열람';
//       case 'CANCEL':
//         return '지원취소';
//     }
//   };

//   const { data: applyListRes } = useQuery<ApplyListResponse>({
//     queryKey: ['applyList', selectedPhase],
//     queryFn: () =>
//       requestApplyList({
//         number: 0,
//         size: 10,
//         key: 0,
//         applyStatuses: [selectedPhase],
//       }),
//   });

//   useEffect(() => {
//     if (applyListRes?.result?.body?.length) {
//       setApplyList(applyListRes?.result?.body);
//     }
//   }, [applyListRes]);

//   return (
//     <ApplyHistoryContainer>
//       <ApplyDashboard>
//         <ItemTitle>지원 현황</ItemTitle>
//         <Dashboard>
//           <ApplyPhase
//             onClick={() => handlePhaseClick('APPLY')}
//             $isSelected={selectedPhase === 'APPLY'}
//           >
//             <ItemName>지원 완료</ItemName>
//             <Value>{getStatusCount('APPLY')}</Value>
//           </ApplyPhase>
//           <Divider />
//           <ApplyPhase
//             onClick={() => handlePhaseClick('PASS')}
//             $isSelected={selectedPhase === 'PASS'}
//           >
//             <ItemName>서류 통과</ItemName>
//             <Value>{getStatusCount('PASS')}</Value>
//           </ApplyPhase>
//           <Divider />
//           <ApplyPhase onClick={() => handlePhaseClick('WIN')} $isSelected={selectedPhase === 'WIN'}>
//             <ItemName>최종 합격</ItemName>
//             <Value>{getStatusCount('WIN')}</Value>
//           </ApplyPhase>
//           <Divider />
//           <ApplyPhase
//             onClick={() => handlePhaseClick('LOSE')}
//             $isSelected={selectedPhase === 'LOSE'}
//           >
//             <ItemName>불합격</ItemName>
//             <Value>{getStatusCount('LOSE')}</Value>
//           </ApplyPhase>
//         </Dashboard>
//       </ApplyDashboard>
//       <ApplyListWrapper>
//         <TitleWrapper>
//           <ItemTitle>{parsePhase(selectedPhase)}</ItemTitle>
//           {(selectedPhase === 'APPLY' || selectedPhase === 'CANCELED') && (
//             <FilterBtnWrapper>
//               <FilterBtn onClick={handleFilterBtnClick}>
//                 {parseFilterText(selectedFilter)} <ChevronDownSVG />
//               </FilterBtn>
//               {isFilterMenuShowing && (
//                 <FilterMenu>
//                   <Option onClick={() => handleFilterClick('전체')}>전체</Option>
//                   <Option onClick={() => handleFilterClick('READ')}>열람</Option>
//                   <Option onClick={() => handleFilterClick('UNREAD')}>미열람</Option>
//                   <Option onClick={() => handleFilterClick('CANCEL')}>지원취소</Option>
//                 </FilterMenu>
//               )}
//             </FilterBtnWrapper>
//           )}
//         </TitleWrapper>
//         <ApplyList status={selectedPhase} filter={selectedFilter} applyList={applyList} />
//       </ApplyListWrapper>
//     </ApplyHistoryContainer>
//   );
// };

// export default ApplyHistory;

// const ApplyHistoryContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 60px;
// `;

// const ItemTitle = styled.div`
//   font-size: 22px;
//   font-weight: var(--font-semibold);
//   line-height: 136.4%;
//   letter-spacing: -1.94%;
//   margin-bottom: 20px;
// `;

// const ApplyDashboard = styled.div``;

// const Dashboard = styled.div`
//   width: 685px;
//   height: 120px;
//   display: flex;
//   align-items: center;
//   padding: 12px;
//   border: 1px solid #eaebec;
//   border-radius: 12px;
// `;

// const ApplyPhase = styled.div<{ $isSelected: boolean }>`
//   width: 147.25px;
//   height: 96px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 8px;
//   background-color: ${({ $isSelected }) => ($isSelected ? '#f0f7ff' : 'white')};
//   color: ${({ $isSelected }) => ($isSelected ? '#B81716' : '#171719')};
//   border-radius: 12px;
//   cursor: pointer;
// `;

// const ItemName = styled.div`
//   font-size: 18px;
//   font-weight: var(--font-regualr);
//   line-height: 144.5%;
//   letter-spacing: -0.02%;
// `;

// const Value = styled.div`
//   font-size: 22px;
//   font-weight: var(--font-semibold);
//   line-height: 136.4%;
//   letter-spacing: -1.94%;
// `;

// const Divider = styled.div`
//   width: 1px;
//   height: 96px;
//   background-color: #f3f3f3;
//   margin: 0px 12px;
// `;

// const ApplyListWrapper = styled.div``;

// const TitleWrapper = styled.div`
//   margin-bottom: 20px;
//   border-bottom: 1px solid #f4f4f5;
//   display: flex;
//   align-items: start;
//   justify-content: space-between;
// `;

// const FilterBtnWrapper = styled.div`
//   display: flex;
//   gap: 4px;
//   position: relative;
//   width: 100px;
//   justify-content: end;
// `;

// const FilterBtn = styled.div`
//   font-weight: var(--font-semibold);
//   font-size: 15px;
//   line-height: 160%;
//   letter-spacing: 0.96%;
//   color: #171719;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   gap: 4px;
// `;

// const FilterMenu = styled.div`
//   position: absolute;
//   bottom: -165px;
//   right: 0;
//   width: 111px;
//   height: 160px;
//   border-radius: 10px;
//   padding: 12px 10px;
//   background-color: white;
//   box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.08);
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Option = styled.div`
//   padding: 4px 6px;
//   width: 91px;
//   height: 28px;
//   border-radius: 5px;
//   color: #37383c9b;
//   font-weight: var(--font-semibold);
//   font-size: 14px;
//   line-height: 142.9%;
//   letter-spacing: 1.45%;
//   cursor: pointer;

//   &:hover {
//     background-color: #f6f6f6;
//   }
// `;
