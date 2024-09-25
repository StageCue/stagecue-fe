import request from "..";

interface ReqApplicationsParams {
  limit: string;
  offset: string;
  gender?: string;
  status?: string;
  isFavorite?: boolean;
  sortBy?: string;
  orderBy?: string;
  query?: string;
}

interface ReqChangingApplyState {
  applyIds: string;
  applyStatus: string;
}

export const requestApplications = ({
  limit,
  offset,
}: ReqApplicationsParams) => {
  const res = request({
    method: "get",
    endpoint: `biz/recruits/applications?limit=${limit}&offset=${offset}`,
  });
  return res;
};

export const requestChangingApplyState = ({
  applyIds,
  applyStatus,
}: ReqChangingApplyState) => {
  const res = request({
    method: "put",
    endpoint: `biz/recruits/applications?applyIds=${applyIds}&applyStatus=${applyStatus}`,
  });
  return res;
};
