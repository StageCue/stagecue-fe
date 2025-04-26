import { useQuery } from '@tanstack/react-query';
import { requestApplications } from '@/api/biz';
import { BizApplicationQuery } from '@/pages/biz/types/applicants';
import { useApplicantContext } from '../components/Context';
import { useDebounce } from '@/hooks/useDebounce';

export const useApplicantListQuery = () => {
  const { page, selectedFilter, favoriteFilter, sort, sortDirection, gender, term } =
    useApplicantContext();

  const debouncedTerm = useDebounce(term, 300);

  return useQuery<BizApplicationQuery>({
    queryKey: [
      'applications',
      page,
      selectedFilter,
      favoriteFilter,
      sort,
      sortDirection,
      gender,
      debouncedTerm,
    ],
    queryFn: () =>
      requestApplications({
        number: page,
        isFavorite: favoriteFilter,
        gender,
        sort,
        sortDirection,
        term: debouncedTerm,
        ...(selectedFilter !== '전체' && { applyStatus: selectedFilter }),
      }),
    placeholderData: prev => prev,
  });
};
