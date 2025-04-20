import request from '..';
import { queryParams as _queryParams } from '@/utils/queryParams';

export const requestTroupeDetail = async (name: string) => {
  const queryParams = _queryParams({ name });

  const res = request({
    method: 'get',
    endpoint: `troupes?${queryParams}`,
  });

  return res;
};

export const requestFollowTroupe = async (troupeId: string) => {
  const queryParams = _queryParams({ troupeId });

  const res = request({
    method: 'post',
    endpoint: `troupes/follow?${queryParams}`,
  });

  return res;
};

export const requestUnfollowTroupe = async (troupeId: string) => {
  const queryParams = _queryParams({ troupeId });

  const res = request({
    method: 'delete',
    endpoint: `troupes/follow?${queryParams}`,
  });

  return res;
};
