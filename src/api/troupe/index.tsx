import request from "..";

export const requestTroupeDetail = async (troupeName: string) => {
  const res = request({
    method: "get",
    endpoint: `troupe/@${troupeName}`,
  });

  return res;
};

export const requestFollowTroupe = async (troupeName: string) => {
  const res = request({
    method: "post",
    endpoint: `troupe/@${troupeName}/follow`,
  });

  return res;
};

export const requestUnfollowTroupe = async (troupeName: string) => {
  const res = request({
    method: "delete",
    endpoint: `troupe/@${troupeName}/follow`,
  });

  return res;
};
