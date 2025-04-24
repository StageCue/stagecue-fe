import { useQuery } from '@tanstack/react-query';
import { requestApplications } from '@/api/biz';
import { BizApplicationQuery } from '@/pages/biz/types/applicants';
import { useApplicantContext } from '../components/Context';

export const useApplicantListQuery = () => {
  const { page, selectedFilter, favoriteFilter } = useApplicantContext();

  return useQuery<BizApplicationQuery>({
    queryKey: ['applications', page, selectedFilter, favoriteFilter],
    queryFn: () =>
      requestApplications({
        number: page,
        isFavorite: favoriteFilter,
        ...(selectedFilter !== '전체' && { applyStatus: selectedFilter }),
      }),
    placeholderData: prev => prev,
  });
};
