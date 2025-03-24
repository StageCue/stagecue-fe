import request from '..';

interface ReqRecommendRecruitsParams {
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

export const requestRecommendRecruits = async (data: ReqRecommendRecruitsParams) => {
  const {
    limit = '10',
    offset = '0',
    category = 'MOVIE',
    locations = '서울,경기',
    daysOfWeek = '0',
    feeRange = '',
    orderBy = '0',
    query = '',
  } = data;

  const res = await request({
    method: 'get',
    endpoint: `recruits?limit=${limit}&offset=${offset}&category=${category}&locations=${locations}&daysOfWeek=${daysOfWeek}&feeRange=${feeRange}&orderBy=${orderBy}&query=${query}`,
  });
  return res;
};
