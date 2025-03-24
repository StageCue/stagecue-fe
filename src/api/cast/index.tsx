import request from '..';

interface ReqCastsParams {
  limit: string;
  offset: string;
  category?:
    | 'THEATRE'
    | 'MUSICAL'
    | 'DANCE'
    | 'MOVIE'
    | 'PERFORMANCE'
    | 'TVSHOW'
    | 'SNS'
    | 'SINGER'
    | 'MODEL';
  locations?: string;
  daysOfWeek?: string;
  feeRange?: string;
  orderBy?: 'newest' | 'popular';
  query?: string | null;
}

interface ReqCastsDetailListParams {
  limit: string;
  offset: string;
}

interface ReqApplyCast {
  recruitId: string;
  profileId: string;
}

export const requestCasts = async (data: ReqCastsParams) => {
  const {
    limit = '10',
    offset = '0',
    orderBy = '0',
    category = 'THEATRE',
    daysOfWeek = '0',
    query = '',
    locations = '',
    feeRange = '',
  } = data;

  const res = await request({
    method: 'get',
    endpoint: `recruits?limit=${limit}&offset=${offset}&orderBy=${orderBy}&category=${category}&daysOfWeek=${daysOfWeek}&feeRange=${feeRange}&query=${query}&locations=${locations}`,
  });
  return res;
};

export const requestCastsDetailList = async (data: ReqCastsDetailListParams) => {
  const { limit = '5', offset = '0' } = data;
  const res = await request({
    method: 'get',
    endpoint: `recruits/details?limit=${limit}&offset=${offset}`,
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
