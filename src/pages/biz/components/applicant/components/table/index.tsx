import styled from 'styled-components';
import CheckboxSVG from '@assets/icons/checkbox_gray.svg?react';
import CheckboxCheckedSVG from '@assets/icons/checkbox_checked.svg?react';
import StarSVG from '@assets/icons/star.svg?react';
import StarMarkedSVG from '@assets/icons/star_marked.svg?react';
import CaretDownSVG from '@assets/icons/caret_down.svg?react';
import CaretUpSVG from '@assets/icons/caret_up.svg?react';
import { useEffect, useState } from 'react';
import NoApplicant from './components/noApplicant';
import RadioSVG from '@assets/icons/radio_s.svg?react';
import RadioCheckedSVG from '@assets/icons/radio_s_checked.svg?react';
import ProfileModal from '../profileMdoal';
import StatusTag from '../statusTag';
import { Application } from '@/pages/biz/types/applicants';

interface TableProps {
  applications: Application[];
  onClickCheckbox: (e: React.MouseEvent<HTMLElement, MouseEvent>, id: number, name: string) => void;
  selectedApplyIds: { id: number; name: string }[];
  onClickRow: (id: number, name: string) => void;
  onClickPass: () => void;
  onClickFail: () => void;
  onCloseModal: () => void;
  isProfileModalOpen: boolean;
  showingApplicant: { id: number; name: string };
}

const Table = ({
  applications,
  onClickCheckbox,
  selectedApplyIds,
  onClickRow,
  onClickPass,
  onClickFail,
  onCloseModal,
  isProfileModalOpen,
  showingApplicant,
}: TableProps) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isStarAll, setIsStarAll] = useState(false);
  const [isGenderSortShowing, setIsGenderSortShowing] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isNameAsc, setIsNameAsc] = useState(true);
  const [isAgeAsc, setIsAgeAsc] = useState(true);
  const [isDateAsc, setIsDateAsc] = useState(true);
  const [isStatusAsc, setIsStatusAsc] = useState(true);
  const [sortedApplications, setSortedAplications] = useState<Application[]>([]);
  const [starMarkedIds, setStarMarkedIds] = useState<number[]>([]);

  const orderAsc = ['APPLIED', 'DOCUMENT_PASSED', 'FINAL_ACCEPTED', 'REJECTED', 'CANCEL'];
  const orderDesc = [...orderAsc].reverse();

  const handleNameSortClick = () => {
    setIsNameAsc(prev => !prev);

    if (isNameAsc) {
      setSortedAplications(prev =>
        prev.sort((a, b) => a.performerName.localeCompare(b.performerName))
      );
    } else {
      setSortedAplications(prev =>
        prev.sort((a, b) => b.performerName.localeCompare(a.performerName))
      );
    }
  };

  const handleAgeSortClick = () => {
    setIsAgeAsc(prev => !prev);

    if (isAgeAsc) {
      setSortedAplications(prev => prev.sort((a, b) => a.age - b.age));
    } else {
      setSortedAplications(prev => prev.sort((a, b) => b.age - a.age));
    }
  };

  const handleDateSortClick = () => {
    setIsDateAsc(prev => !prev);

    setSortedAplications(prev => {
      const sorted = [...prev].sort((a, b) => {
        return isDateAsc
          ? a.applyDate.localeCompare(b.applyDate)
          : b.applyDate.localeCompare(a.applyDate);
      });

      return sorted;
    });
  };

  const handleStatusSortClick = () => {
    setIsStatusAsc(prev => !prev);

    if (isStatusAsc) {
      setSortedAplications(prev =>
        prev.sort((a, b) => orderAsc.indexOf(a.applyStatus) - orderAsc.indexOf(b.applyStatus))
      );
    } else {
      setSortedAplications(prev =>
        prev.sort((a, b) => orderDesc.indexOf(a.applyStatus) - orderDesc.indexOf(b.applyStatus))
      );
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsCheckedAll(prev => !prev);
    applications.map(({ applyId, performerName }) => onClickCheckbox(e, applyId, performerName));
  };

  const handleAllStarClick = () => {
    setIsStarAll(prev => !prev);
    if (!isStarAll) {
      setStarMarkedIds(applications.map(({ applyId }) => applyId));
    } else {
      setStarMarkedIds([]);
    }
  };

  const handleStarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, applyId: number) => {
    e.stopPropagation();
    if (starMarkedIds.includes(applyId)) {
      setStarMarkedIds(prev => prev.filter(id => id !== applyId));
    } else {
      setStarMarkedIds(prev => [...prev, applyId]);
    }
  };

  const handleGenderColumnClick = () => {
    setIsGenderSortShowing(prev => !prev);
  };

  const handleGenderSortingClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    gender: string
  ) => {
    event.stopPropagation();
    setSelectedGender(gender);
    setIsGenderSortShowing(false);

    if (gender === 'MALE') {
      setSortedAplications(prev =>
        prev.sort((a, b) => {
          if (a.gender === b.gender) {
            return 0;
          }
          return a.gender === 'MALE' ? -1 : 1;
        })
      );
    } else {
      setSortedAplications(prev =>
        prev.sort((a, b) => {
          if (a.gender === b.gender) {
            return 0;
          }
          return a.gender === 'FEMALE' ? -1 : 1;
        })
      );
    }
  };
  useEffect(() => {
    if (selectedApplyIds.length !== 0 && selectedApplyIds.length === applications.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  }, [selectedApplyIds, applications]);

  useEffect(() => {
    if (starMarkedIds.length !== 0 && starMarkedIds.length === applications.length) {
      setIsStarAll(true);
    } else {
      setIsStarAll(false);
    }
  }, [starMarkedIds, applications]);

  useEffect(() => {
    if (applications.length > 0) {
      setSortedAplications(applications);

      const favoriteIds = applications
        .filter(application => application.isFavorite)
        .map(application => application.applyId);

      setStarMarkedIds(favoriteIds);
    } else {
      setSortedAplications([]);
    }
  }, [applications]);

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
        <NameColumn onClick={handleNameSortClick}>
          이름
          <CaretWrapper>{isNameAsc ? <CaretDownSVG /> : <CaretUpSVG />}</CaretWrapper>
        </NameColumn>
        <AgeColumn onClick={handleAgeSortClick}>
          나이
          <CaretWrapper>{isAgeAsc ? <CaretDownSVG /> : <CaretUpSVG />}</CaretWrapper>
        </AgeColumn>
        <GenderColumn onClick={handleGenderColumnClick}>
          성별
          <CaretWrapper>{isGenderSortShowing ? <CaretUpSVG /> : <CaretDownSVG />}</CaretWrapper>
          {isGenderSortShowing && (
            <GenderSort>
              <GenderOption onClick={e => handleGenderSortingClick(e, '남성')}>
                <RaidoWrapper>
                  {selectedGender === '남성' ? <RadioCheckedSVG /> : <RadioSVG />}
                </RaidoWrapper>
                남성
              </GenderOption>
              <GenderOption onClick={e => handleGenderSortingClick(e, '여성')}>
                <RaidoWrapper>
                  {selectedGender === '여성' ? <RadioCheckedSVG /> : <RadioSVG />}
                </RaidoWrapper>
                여성
              </GenderOption>
            </GenderSort>
          )}
        </GenderColumn>
        <PostTitleColumn>공고명</PostTitleColumn>
        <DateColumn onClick={handleDateSortClick}>
          지원 일자
          <CaretWrapper>{isDateAsc ? <CaretDownSVG /> : <CaretUpSVG />}</CaretWrapper>
        </DateColumn>
        <StateColumn onClick={handleStatusSortClick}>
          상태
          <CaretWrapper>{isStatusAsc ? <CaretDownSVG /> : <CaretUpSVG />}</CaretWrapper>
        </StateColumn>
      </Header>
      <Body>
        {sortedApplications?.map(
          ({
            applyId,
            profileId,
            age,
            gender,
            performerName,
            recruitTitle,
            applyDate,
            applyStatus,
          }) => (
            <>
              <Row key={applyId} onClick={() => onClickRow(applyId, performerName)}>
                <CheckboxInRow>
                  <CheckIconWrapper onClick={e => onClickCheckbox(e, applyId, performerName)}>
                    {selectedApplyIds.some(apply => apply.id === applyId) ? (
                      <CheckedIconWrapper $isChecked={true}>
                        <CheckboxCheckedSVG />
                      </CheckedIconWrapper>
                    ) : (
                      <CheckedIconWrapper $isChecked={false}>
                        <CheckboxSVG />
                      </CheckedIconWrapper>
                    )}
                  </CheckIconWrapper>
                  <StarIconWrapper
                    onClick={e => handleStarClick(e, applyId)}
                    $isMarked={starMarkedIds.includes(applyId)}
                  >
                    {starMarkedIds.includes(applyId) ? <StarMarkedSVG /> : <StarSVG />}
                  </StarIconWrapper>
                </CheckboxInRow>
                <Name>{performerName}</Name>
                <Age>{age}</Age>
                <Gender>{gender === 'MALE' ? '남' : '여'}</Gender>
                <PostTitle>{recruitTitle}</PostTitle>
                <Date>{applyDate}</Date>
                <StatusTag status={applyStatus} />
              </Row>
              {isProfileModalOpen && showingApplicant.id === applyId && (
                <ProfileModal
                  id={`${profileId}`}
                  onClickPass={onClickPass}
                  onClickFail={onClickFail}
                  onClose={onCloseModal}
                  name={performerName}
                  applyStatus={applyStatus}
                />
              )}
            </>
          )
        )}
        {applications.length === 0 && <NoApplicant />}
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
  width: 28px;
  height: 28px;
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

const NameColumn = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
  cursor: pointer;
`;

const AgeColumn = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
  cursor: pointer;
`;

const GenderColumn = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
  position: relative;
  cursor: pointer;
`;

const PostTitleColumn = styled.div`
  display: flex;
  align-items: center;
  width: 408px;
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
`;

const GenderSort = styled.div`
  position: absolute;
  bottom: -72px;
  width: 81px;
  height: 76px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
`;

const GenderOption = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  width: 53px;
  height: 20px;
  cursor: pointer;
`;

const RaidoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #f4f4f5;
  align-items: center;
  display: flex;
  padding: 6px 24px;
  gap: 16px;
  cursor: pointer;
`;

const CheckboxInRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 36px;
  padding: 8px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
`;

const Age = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
`;

const PostTitle = styled.div`
  display: flex;
  align-items: center;
  width: 408px;
  height: 36px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
`;

const CheckIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 28px;
    height: 28px;
  }
`;

const StarIconWrapper = styled.div<{ $isMarked: boolean }>`
  rect {
    fill: ${({ $isMarked }) => !$isMarked && '#e0e0e2'};
  }
`;

const CheckedIconWrapper = styled.div<{ $isChecked: boolean }>`
  rect {
    stroke: ${({ $isChecked }) => !$isChecked && '#e0e0e2'};
  }
`;
