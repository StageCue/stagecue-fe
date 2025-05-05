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

export const useBizPost = () => {
  const { page, selectedFilter, favoriteFilter, term, sort } = usePostListContext();

  return useQuery<BizRecruitQuery['result']>({
    queryKey: ['bizRecruits', page, selectedFilter, favoriteFilter, term, sort],
    queryFn: () =>
      requestRecruits({
        search: term ?? undefined,
        number: page,
        sort: sort ?? undefined,
        isFavorite: favoriteFilter,
        recruitStatus: selectedFilter === '전체' ? null : selectedFilter,
      }),
    placeholderData: prev => prev,
  });
};
