import request from '..';
import { queryParams as _queryParams } from '@/utils/queryParams';

interface ReqNoticesParam {
  number: number;
  size: number;
}

export const requestNotices = async (data: ReqNoticesParam) => {
  const queryParams = _queryParams<ReqNoticesParam>(data);

  const res = await request({
    method: 'get',
    endpoint: `notices?${queryParams}`,
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
