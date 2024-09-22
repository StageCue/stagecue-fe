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

export const requestCasts = async (data: ReqCastsParams) => {
  const { limit = "10", offset = "0", orderBy = "0" } = data;
  const res = await request({
    method: "get",
    endpoint: `casts?limit=${limit}&offset=${offset}&orderBy=${orderBy}`,
  });
  return res;
};
