import { useQuery } from '@tanstack/react-query';
import { requestAppliedCasts } from '@/api/users';
import { ApplyStatus } from '@/pages/biz/types/applicants';
import { AppliedCastsResponse } from '../types/api';

export const useApplyData = (status: ApplyStatus) => {
  return useQuery<AppliedCastsResponse>({
    queryKey: ['appliedCasts', status],
    queryFn: () => requestAppliedCasts({ key: 0, size: 10, applyStatuses: status }),
    staleTime: 1000 * 60 * 5,
    enabled: !!status,
  });
};
