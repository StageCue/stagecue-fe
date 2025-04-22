import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { requestApplications, requestChangingApplyState } from '@/api/biz';
import { ApplyFilter, ApplyStatus, BizApplicationQuery, PassType } from '../../../types/applicants';

interface ShowingApplicantState {
  id: number;
  name: string;
}

export const useApplicant = () => {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<ApplyFilter>('전체');
  const [selectedApplyIds, setSelectedApplyIds] = useState<{ id: number; name: string }[]>([]);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showingApplicant, setShowingApplicant] = useState<ShowingApplicantState>();
  const [passType, setPassType] = useState<PassType>();

  const queryClient = useQueryClient();

  const { data } = useQuery<BizApplicationQuery>({
    queryKey: ['applications', page],
    queryFn: () => requestApplications({ number: page }),
  });

  useEffect(() => {
    if (selectedFilter === 'APPLY') {
      setPassType('DOCUMENT_PASSED');
    } else if (selectedFilter === 'PASS') {
      setPassType('FINAL_ACCEPTED');
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
    queryClient.invalidateQueries({ queryKey: ['applications', page] });

    setIsPassModalOpen(false);
    setIsProfileModalOpen(false);
  };

  const handleFailConfirm = async () => {
    const idsArray = selectedApplyIds.map(item => item.id);

    await requestChangingApplyState({
      applyIds: `${idsArray}`,
      applyStatus: 'REJECTED',
    });

    setSelectedApplyIds([]);
    queryClient.invalidateQueries({ queryKey: ['applications', page] });

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
  };
};
