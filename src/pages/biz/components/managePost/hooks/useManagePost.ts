import { useState } from 'react';
import { requestChangeEndDate, requestDeleteRecruit } from '@/api/biz';
import { RecruitStatus } from '@/types/biz';
import { useGetBizPost } from './useGetPost';
import { usePostListContext } from '../components/context';
import { formatDate } from '@/utils/format';

export type ManageRecruitFilterType = RecruitStatus | '전체';

export const useManagePost = () => {
  const { setPage, setSelectedFilter } = usePostListContext();

  const [selectedRecruitIds, setSelectedRecruitIds] = useState<number[]>([]);
  const [isCloseRecruitModalOpen, setCloseRecruitModalOpen] = useState(false);
  const [isChangeDeadlieModalOpen, setIsChangeDeadlineModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, refetch } = useGetBizPost();

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
      ids: selectedRecruitIds,
      endDate,
    });

    setIsChangeDeadlineModalOpen(false);
    refetch();
  };

  const handleConfirmClick = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await requestChangeEndDate({
      ids: selectedRecruitIds,
      endDate: formatDate(yesterday),
    });

    setCloseRecruitModalOpen(false);

    refetch();
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

  const handleAllCheckBoxClick = (value: boolean) => {
    if (value) {
      setSelectedRecruitIds(data?.body?.map(item => item?.id) as number[]);
    } else {
      setSelectedRecruitIds([]);
    }
  };

  const deleteRecruit = async () => {
    await requestDeleteRecruit({
      ids: selectedRecruitIds,
    });

    setIsDeleteModalOpen(false);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
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
