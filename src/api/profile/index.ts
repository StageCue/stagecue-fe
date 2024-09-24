import request from "..";

export const requestProfileList = async () => {
  const res = await request({
    method: "get",
    endpoint: `users/profiles`,
  });
  return res;
};
