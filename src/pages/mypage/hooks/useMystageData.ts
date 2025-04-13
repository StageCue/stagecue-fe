import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestCastsStatus, requestScraps } from '@/api/users';
import { requestCasts, requestDeleteScrapCast, requestScrapCast } from '@/api/cast';
import { Scrap } from '../types/data';
import { getDday } from '@/utils/getDday';

interface RecruitStatusCount {
  applyStatus:
    | 'APPLY' // 지원완료
    | 'PASS' // 서류통과
    | 'WIN' // 합격
    | 'LOSE'; // 불합격
  count: number;
}

interface RecruitStatusResponse {
  result: RecruitStatusCount[];
}

export const useMyStageData = () => {
  const queryClient = useQueryClient();

  const { data: recruitsStatus } = useQuery<RecruitStatusResponse>({
    queryKey: ['recruitsStatus'],
    queryFn: requestCastsStatus,
    staleTime: 1000 * 60 * 5,
  });

  const { data: popularRecruits } = useQuery({
    queryKey: ['popularRecruits'],
    queryFn: () =>
      requestCasts({
        key: 0,
        size: 4,
        category: 'THEATER',
        sort: 'VIEW',
      }),
    staleTime: 1000 * 60 * 5,
    select: data => data.recruit,
  });

  const { data: scraps = [] } = useQuery<Scrap[]>({
    queryKey: ['scrappedCasts'],
    queryFn: async () => {
      const { result } = await requestScraps({ key: 0, size: 3 });

      return (
        result?.content?.map(
          (scrap: {
            recruitId: number;
            title: string;
            imageUrl: string;
            troupeName: string;
            shortAddress: string;
          }) => ({
            castId: scrap.recruitId.toString(),
            castTitle: scrap.title,
            imageUrl: scrap.imageUrl,
            troupeName: scrap.troupeName,
            practiceAddress: scrap.shortAddress,
            // TODO: 임시 코드
            // dday: getDday(scrap.dateExpired) 이 코드로 변경해야함.
            dday: getDday(new Date(new Date().setDate(new Date().getDate() + 5)).toISOString()),
            isBookmarked: true,
          })
        ) ?? []
      );
    },
    staleTime: 0,
  });

  const bookmarkMutation = useMutation({
    mutationFn: async (id: string) => {
      const isBookmarked = scraps.find((cast: Scrap) => cast.castId === id)?.isBookmarked;

      if (isBookmarked) {
        await requestDeleteScrapCast(id);
      } else {
        await requestScrapCast(id);
      }

      return !isBookmarked;
    },
    onMutate: async (id: string) => {
      const previousScraps = queryClient.getQueryData(['scrappedCasts']);
      queryClient.cancelQueries({ queryKey: ['scrappedCasts'] });
      queryClient.setQueryData(['scrappedCasts'], (oldScraps: Scrap[] = []) =>
        oldScraps.map(scrap =>
          scrap.castId === id ? { ...scrap, isBookmarked: !scrap.isBookmarked } : scrap
        )
      );

      return { previousScraps };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousScraps) {
        queryClient.setQueryData(['scrappedCasts'], context.previousScraps);
      }
    },
  });

  const handleBookmarkClick = (id: string) => bookmarkMutation.mutate(id);

  return {
    recruitsStatus,
    popularRecruits,
    scraps,
    handleBookmarkClick,
  };
};
