import styled from 'styled-components';
import SearchSVG from '@assets/icons/search.svg?react';
import Button from '@/components/buttons/button';
import Table from './components/table';
import PassSVG from '@assets/icons/pass.svg?react';
import FailSVG from '@assets/icons/fail.svg?react';
import PassModal from './components/passModal';
import Paginator from '@/components/paginator';
import { useApplicant } from './hooks/useApplicant';

const Applicant = () => {
  const {
    page,
    selectedFilter,
    selectedApplyIds,
    isPassModalOpen,
    isFailModalOpen,
    isProfileModalOpen,
    showingApplicant,
    passType,
    data,
    handleFilterClick,
    handlePassClick,
    handleFailClick,
    handlePassConfirm,
    handleFailConfirm,
    handleCancelClick,
    handleCloseProfileClick,
    handlePageChange,
    handleCheckboxClick,
    filterByApplyStatus,
    handleApplicantRowClick,
  } = useApplicant();

  return (
    <ApplicantContainer>
      {isPassModalOpen && (
        <PassModal
          onConfirm={handlePassConfirm}
          onClose={handleCancelClick}
          type="합격"
          name={isProfileModalOpen ? showingApplicant!.name : selectedApplyIds[0].name}
        />
      )}
      {isFailModalOpen && (
        <PassModal
          onConfirm={handleFailConfirm}
          onClose={handleCancelClick}
          type="반려"
          name={isProfileModalOpen ? showingApplicant!.name : selectedApplyIds[0].name}
        />
      )}
      <TitleWrapper>
        <Title>지원자 관리</Title>
        <Searchbar>
          <SearchSVG />
          <SearchInput placeholder="지원자명, 공고명으로 검색" />
        </Searchbar>
      </TitleWrapper>
      <FilterWrapper>
        <Filters>
          <Option onClick={() => handleFilterClick('전체')} $isSelected={selectedFilter === '전체'}>
            전체 {data?.applications?.length}
          </Option>
          <FilterDivider />
          <Option
            onClick={() => handleFilterClick('APPLY')}
            $isSelected={selectedFilter === 'APPLY'}
          >
            미열람 {filterByApplyStatus('APPLY')?.length}
          </Option>
          <FilterDivider />
          <Option onClick={() => handleFilterClick('PASS')} $isSelected={selectedFilter === 'PASS'}>
            서류합격 {filterByApplyStatus('PASS')?.length}
          </Option>
          <FilterDivider />
          <Option onClick={() => handleFilterClick('WIN')} $isSelected={selectedFilter === 'WIN'}>
            최종합격 {filterByApplyStatus('WIN')?.length}
          </Option>
          <FilterDivider />
          <Option onClick={() => handleFilterClick('LOSE')} $isSelected={selectedFilter === 'LOSE'}>
            불합격 {filterByApplyStatus('LOSE')?.length}
          </Option>
        </Filters>
        <ButtonsWrapper>
          {(selectedFilter === '전체' || selectedFilter === 'APPLY') && (
            <>
              <Button
                variation="outlined"
                btnClass="assistive"
                onClick={() => handlePassClick('DOCUMENT_PASSED')}
                width={100}
                height={32}
                fontSize={13}
                lineHeight={138.5}
                letterSpacing={1.94}
                padding="8px 14px"
              >
                <IconWrapper>
                  <PassSVG />
                </IconWrapper>
                서류합격
              </Button>
              <Button
                variation="outlined"
                btnClass="assistive"
                onClick={() => handlePassClick('FINAL_ACCEPTED')}
                width={100}
                height={32}
                fontSize={13}
                lineHeight={138.5}
                letterSpacing={1.94}
                padding="8px 14px"
              >
                <IconWrapper>
                  <PassSVG />
                </IconWrapper>
                최종합격
              </Button>
            </>
          )}
          {selectedFilter == 'PASS' && (
            <>
              <Button
                variation="outlined"
                btnClass="assistive"
                onClick={() => handlePassClick('FINAL_ACCEPTED')}
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
            </>
          )}
        </ButtonsWrapper>
      </FilterWrapper>
      {data?.applications && (
        <Table
          applications={
            selectedFilter === '전체' ? data?.applications : filterByApplyStatus(selectedFilter)
          }
          onClickCheckbox={handleCheckboxClick}
          selectedApplyIds={selectedApplyIds}
          onClickRow={handleApplicantRowClick}
          onClickPass={handlePassClick}
          onClickFail={handleFailClick}
          onCloseModal={handleCloseProfileClick}
          isProfileModalOpen={isProfileModalOpen}
          showingApplicant={showingApplicant!}
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
  font-weight: ${({ $isSelected }) => ($isSelected ? 'var(--font-bold)' : 'var(--font-regular)')};
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? '#f4f4f5' : 'white')};

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
