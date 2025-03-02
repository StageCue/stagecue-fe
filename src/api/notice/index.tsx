import request from '..';

interface ReqNoticesParam {
  limit: number;
  offset: number;
}

export const requestNotices = async ({ limit, offset }: ReqNoticesParam) => {
  const res = await request({
    method: 'get',
    endpoint: `notices?limit=${limit}&offset=${offset}`,
  });
  return res;
};

export const requestNoticeDetail = async (noticeId: number) => {
  const res = await request({
    method: 'get',
    endpoint: `notices/${noticeId}`,
  });
  return res;
};
