import { requestApplyStatus } from '@/api/biz';
import { useQuery } from '@tanstack/react-query';

type ApplyStatusKey = 'APPLY' | 'OPEN' | 'PASS' | 'WIN' | 'LOSE' | 'TOTAL';

type ApplyStatusCounts = Record<ApplyStatusKey, number>;

export const useGetApplyStatus = () => {
  return useQuery<ApplyStatusCounts>({
    queryKey: ['applyStatus'],
    queryFn: async () => {
      const res = await requestApplyStatus();
      const counts = res.result.reduce(
        (
          acc: ApplyStatusCounts,
          { applyStatus, count }: { applyStatus: ApplyStatusKey; count: number }
        ) => {
          acc[applyStatus] = count;
          acc['TOTAL'] += count;
          return acc;
        },
        {
          APPLY: 0,
          OPEN: 0,
          PASS: 0,
          WIN: 0,
          LOSE: 0,
          TOTAL: 0,
        } as ApplyStatusCounts
      );
      console.log(counts);

      return counts;
    },
  });
};
