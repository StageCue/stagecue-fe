import { requestRecruits } from '@/api/biz';
import { Recruit } from '@/types/biz';
import { useQuery } from '@tanstack/react-query';
import { usePostListContext } from '../components/context';

export interface BizRecruitQuery {
  result: {
    pagingParam: {
      number: number;
      size: number;
      key: number;
    };
    body: Recruit[];
  };
}

export const useGetBizPost = () => {
  const { page, selectedFilter, favoriteFilter, term, sort, sortDirection } = usePostListContext();

  return useQuery<BizRecruitQuery['result']>({
    queryKey: ['bizRecruits', page, selectedFilter, favoriteFilter, term, sort],
    queryFn: () =>
      requestRecruits({
        search: term ?? undefined,
        number: page,
        sort: sort,
        sortDirection: sortDirection,
        isFavorite: favoriteFilter,
        recruitStatus: selectedFilter === '전체' ? null : selectedFilter,
      }),
    placeholderData: prev => prev,
  });
};
