import request from '..';
import { queryParams as _queryParams } from '@/utils/queryParams';

interface ReqCastsParams {
  key?: number;
  size?: number;
  category: 'THEATER' | 'MUSICAL' | 'DANCE';
  location?: string[] | null;
  practiceDay?: string[] | null;
  monthlyFeeStart?: number;
  monthlyFeeEnd?: number;
  sort: 'RECENT' | 'VIEW';
  search?: string | null;
}
interface ReqApplyCast {
  recruitId: string;
  profileId: string;
}

export const requestCasts = async (data: ReqCastsParams) => {
  const queryParams = _queryParams<ReqCastsParams>(data);

  const res = await request({
    method: 'get',
    endpoint: `recruits?${queryParams}`,
  });

  return res;
};

export const requestPopularCasts = async (data: ReqCastsParams) => {
  const queryParams = _queryParams<ReqCastsParams>(data);

  const res = await request({
    method: 'get',
    endpoint: `recruits?${queryParams}`,
  });
  return res;
};

export const requestCastDetail = async (id: string) => {
  const res = await request({
    method: 'get',
    endpoint: `recruits/${id}`,
  });
  return res;
};

export const requestApplyCast = async ({ recruitId, profileId }: ReqApplyCast) => {
  const queryParams = _queryParams({ profileId });

  const res = await request({
    method: 'post',
    endpoint: `applies/recruits/${recruitId}?${queryParams}`,
  });
  return res;
};

export const requestScrapCast = async (recruitId: string | number) => {
  const queryParams = _queryParams({ recruitId });

  const res = await request({
    method: 'post',
    endpoint: `recruits/scrap?${queryParams}`,
  });

  return res;
};

export const requestDeleteScrapCast = async (troupeId: string | number) => {
  const queryParams = _queryParams({ troupeId });

  const res = await request({
    method: 'delete',
    endpoint: `recruits/scrap?${queryParams}`,
  });

  return res;
};
