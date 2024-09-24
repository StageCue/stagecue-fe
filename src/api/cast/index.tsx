import request from "..";

interface ReqCastsParams {
  limit: string;
  offset: string;
  category?: string;
  location?: string;
  dayOfWeek?: string;
  feeRange?: string;
  orderBy?: "newest" | "popular" | "0";
  query?: string;
}

interface ReqCastsDetailListParams {
  limit: string;
  offset: string;
}

interface ReqApplyCast {
  castId: string;
  profileId: string;
}

export const requestCasts = async (data: ReqCastsParams) => {
  const { limit = "10", offset = "0", orderBy = "0" } = data;
  const res = await request({
    method: "get",
    endpoint: `casts?limit=${limit}&offset=${offset}&orderBy=${orderBy}`,
  });
  return res;
};

export const requestCastsDetailList = async (
  data: ReqCastsDetailListParams
) => {
  const { limit = "5", offset = "0" } = data;
  const res = await request({
    method: "get",
    endpoint: `casts/details?limit=${limit}&offset=${offset}`,
  });
  return res;
};

export const requestCastDetail = async (id: string) => {
  const res = await request({
    method: "get",
    endpoint: `casts/${id}`,
  });
  return res;
};

export const requestApplyCast = async ({ castId, profileId }: ReqApplyCast) => {
  const res = await request({
    method: "post",
    endpoint: `casts/${castId}/apply?profileId=${profileId}`,
  });
  return res;
};
