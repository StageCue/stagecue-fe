import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  requestChangeEndDate,
  requestCloseRecruit,
  requestDeleteRecruit,
  requestRecruits,
} from '@/api/biz';
import { Recruit } from '@/types/biz';

type ManageRecruitFilterType = 'TEMP' | 'RECRUIT' | 'CLOSED' | '전체';

interface BizRecruitQuery {
  totalCount: number;
  recruits: Recruit[];
}

export const useManagePost = () => {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<ManageRecruitFilterType>('전체');
  const [selectedRecruitIds, setSelectedRecruitIds] = useState<number[]>([]);
  const [isCloseRecruitModalOpen, setCloseRecruitModalOpen] = useState(false);
  const [isChangeDeadlieModalOpen, setIsChangeDeadlineModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      queryKey: ['bizRecruits', page, selectedFilter],
    });
  };

  const handleConfirmClick = async () => {
    await requestCloseRecruit({
      recruitIds: selectedRecruitIds,
      status: 'CLOSED',
    });

    setCloseRecruitModalOpen(false);

    queryClient.invalidateQueries({
      queryKey: ['bizRecruits', page, selectedFilter],
    });
  };

  const handleCheckboxClick = (id: number) => {
    if (selectedRecruitIds.includes(id)) {
      setSelectedRecruitIds(prev => {
        const newArray = prev.filter(recruitId => recruitId !== id);
        return newArray;
      });
    } else {
      setSelectedRecruitIds([...selectedRecruitIds, id]);
    }
  };

  const handleAllCheckBoxClick = (value: boolean, data?: BizRecruitQuery) => {
    if (value) {
      setSelectedRecruitIds(data?.recruits.map(item => item?.id) as number[]);
    } else {
      setSelectedRecruitIds([]);
    }
  };

  const deleteRecruit = async () => {
    await requestDeleteRecruit({
      applyIds: selectedRecruitIds,
    });

    setIsDeleteModalOpen(false);

    queryClient.invalidateQueries({
      queryKey: ['bizRecruits', page, selectedFilter],
    });
  };

  const { data } = useQuery<BizRecruitQuery>({
    queryKey: ['bizRecruits', page, selectedFilter],
    queryFn: () =>
      requestRecruits({
        status: selectedFilter === '전체' ? '' : selectedFilter,
      }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    selectedFilter,
    selectedRecruitIds,
    isCloseRecruitModalOpen,
    isChangeDeadlieModalOpen,
    isDeleteModalOpen,
    data,
    setCloseRecruitModalOpen,
    setIsChangeDeadlineModalOpen,
    setIsDeleteModalOpen,
    handleFilterClick,
    handleChangeDeadlineClick,
    handleCloseChangeDeadlineClick,
    handleCloseRecruitClick,
    handleCancelClick,
    handleDeadlineConfirm,
    handleConfirmClick,
    handleCheckboxClick,
    handleAllCheckBoxClick,
    deleteRecruit,
    handlePageChange,
  };
};
