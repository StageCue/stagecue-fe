import { requestTroupeInfo } from '@/api/biz';
import { useQuery } from '@tanstack/react-query';

export const useGetTroupeInfo = () => {
  return useQuery({
    queryKey: ['troupe'],
    queryFn: () => requestTroupeInfo(),
    select: (data) => data,
  });
};
