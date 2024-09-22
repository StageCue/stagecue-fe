import request from "..";

export const requestBanners = async () => {
  const res = await request({
    method: "get",
    endpoint: "ad/banners",
  });
  return res;
};
