import request from '..';
import { queryParams as _queryParams } from '@/utils/queryParams';

interface ReqCastsParams {
  key?: number;
  size?: number;
  category: 'THEATER' | 'MUSICAL' | 'DANCE';
  practiceDay?: string[];
  monthlyFeeStart?: number;
  monthlyFeeEnd?: number;
  sort: 'RECENT' | 'VIEW';
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
  const res = await request({
    method: 'post',
    endpoint: `recruits/${recruitId}/apply?profileId=${profileId}`,
  });
  return res;
};

export const requestScrapCast = async (recruitId: string) => {
  const res = await request({
    method: 'post',
    endpoint: `recruits/${recruitId}/scrap`,
  });

  return res;
};

export const requestDeleteScrapCast = async (recruitId: string) => {
  const res = await request({
    method: 'delete',
    endpoint: `recruits/${recruitId}/scrap`,
  });

  return res;
};
