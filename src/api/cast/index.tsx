import request from "..";

interface ReqCastsParams {
  limit: string;
  offset: string;
  category?: "THEATRE" | "MUSICAL" | "DANCE";
  locations?: string;
  daysOfWeek?: string;
  feeRange?: string;
  orderBy?: "newest" | "popular";
  query?: string | null;
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
  const {
    limit = "10",
    offset = "0",
    orderBy = "0",
    category = "THEATRE",
    daysOfWeek = "0",
    query = "",
    locations = "",
  } = data;

  const res = await request({
    method: "get",
    endpoint: `casts?limit=${limit}&offset=${offset}&orderBy=${orderBy}&category=${category}&daysOfWeek=${daysOfWeek}&query=${query}&locations=${locations}`,
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

export const requestScrapCast = async (castId: string) => {
  const res = await request({
    method: "post",
    endpoint: `casts/${castId}/scrap`,
  });

  return res;
};

export const requestDeleteScrapCast = async (castId: string) => {
  const res = await request({
    method: "delete",
    endpoint: `casts/${castId}/scrap`,
  });

  return res;
};
