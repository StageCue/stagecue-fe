import request from "..";

export const requestCastsStatus = async () => {
  const res = await request({
    method: "get",
    endpoint: "users/casts/status",
  });

  return res;
};
