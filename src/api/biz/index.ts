import request from "..";

export const requestApplications = () => {
  const res = request({
    method: "get",
    endpoint: "",
  });
  return res;
};
