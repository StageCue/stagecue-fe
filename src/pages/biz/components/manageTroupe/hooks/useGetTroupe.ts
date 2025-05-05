import { requestTroupeInfo } from '@/api/biz';
import { useQuery } from '@tanstack/react-query';

export const useGetTroupeInfo = () => {
  const { data } = useQuery({
    queryKey: ['troupe'],
    queryFn: () => requestTroupeInfo(),
  });
  return data;
};
