import request from '..';

export const requestRecommendRecruits = async () => {
  const res = await request({
    method: 'get',
    endpoint: 'recruits/recommend',
  });

  return res;
};
