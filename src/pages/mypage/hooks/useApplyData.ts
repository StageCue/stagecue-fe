import { useQuery } from '@tanstack/react-query';
import { requestAppliedCasts } from '@/api/users';
import { ApplyStatus } from '@/pages/biz/types/applicants';
import { AppliedCastsResponse } from '../types/api';
import { filterType } from '../components/applyHistory';

export const useApplyData = (status: ApplyStatus, filter?: filterType) => {
  if (filter === 'CANCEL') status = 'CANCELED';

  return useQuery<AppliedCastsResponse>({
    queryKey: ['appliedCasts', status, filter],
    queryFn: () => requestAppliedCasts({ key: 0, size: 10, applyStatuses: status }),
    staleTime: 1000 * 60 * 5,
    enabled: !!status,
  });
};
