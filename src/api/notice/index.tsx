import request from "..";

export const requestNotices = async () => {
  const res = await request({
    method: "get",
    endpoint: "notices",
  });
  return res;
};
