import { useEffect } from 'react';
import { requestChangingApplyState } from '@/api/biz';
import { ApplyFilter, ApplyStatus, PassType } from '../../../types/applicants';
import { useApplicantContext } from '../components/Context';
import { useApplicantListQuery } from './useQuery';
import { useGetApplyStatus } from './useGetApplyStatus';

export const useApplicant = () => {
  const { data, refetch: refetchApplicants } = useApplicantListQuery();
  const { refetch: refetchApplyStatus } = useGetApplyStatus();

  const {
    page,
    selectedFilter,
    selectedApplyIds,
    passType,
    setPage,
    setPassType,
    setSelectedFilter,
    setSelectedApplyIds,
    setIsPassModalOpen,
    setIsFailModalOpen,
    setIsProfileModalOpen,
    setShowingApplicant,
  } = useApplicantContext();

  useEffect(() => {
    if (selectedFilter === 'APPLY') {
      setPassType('PASS');
    } else if (selectedFilter === 'PASS') {
      setPassType('WIN');
    }
  }, [selectedFilter]);

  const handleFilterClick = (filter: ApplyFilter) => {
    setSelectedFilter(filter);
  };

  const handlePassClick = async (passType?: PassType) => {
    if (selectedApplyIds.length === 0) return;
    setIsPassModalOpen(true);
    if (selectedFilter === '전체') {
      setPassType(passType);
    }
  };

  const handleFailClick = async () => {
    setIsFailModalOpen(true);
  };

  const handlePassConfirm = async () => {
    const idsArray = selectedApplyIds.map(item => item.id);

    await requestChangingApplyState({
      applyIds: `${idsArray}`,
      applyStatus: passType!,
    });

    setSelectedApplyIds([]);

    refetchApplyStatus();
    refetchApplicants();

    setIsPassModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const handleFailConfirm = async () => {
    const idsArray = selectedApplyIds.map(item => item.id);

    await requestChangingApplyState({
      applyIds: `${idsArray}`,
      applyStatus: 'CANCELED',
    });

    setSelectedApplyIds([]);

    refetchApplicants();
    refetchApplyStatus();

    setIsFailModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsFailModalOpen(false);
    setIsPassModalOpen(false);
  };

  const handleCloseProfileClick = () => {
    setIsProfileModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCheckboxClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number,
    name: string
  ) => {
    e.stopPropagation();
    if (selectedApplyIds.some(apply => apply.id === id)) {
      setSelectedApplyIds(prev => {
        const newArray = prev.filter(({ id: applyId }) => applyId !== id);
        return newArray;
      });
    } else {
      setSelectedApplyIds([...selectedApplyIds, { id, name }]);
    }
  };

  const filterByApplyStatus = (status: ApplyStatus) => {
    if (data?.applications) {
      const filteredArray = data.applications.filter(
        application => application['applyStatus'] === status
      );
      return filteredArray;
    } else {
      return [];
    }
  };

  const handleApplicantRowClick = (id: number, name: string) => {
    setIsProfileModalOpen(true);
    setShowingApplicant({ id, name });
  };

  return {
    page,
    selectedFilter,
    selectedApplyIds,
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
  };
};
