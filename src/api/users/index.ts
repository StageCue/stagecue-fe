import request from "..";

interface ReqChangeUserTypeParams {
  userType: "ADMIN" | "PERFORMER" | "TROUPE";
}

interface ReqScrapsParams {
  limit: number;
  offset: number;
}

interface ReqAppliedCastsParams {
  limit: number;
  offset: number;
  status:
    | "APPLIED"
    | "DOCUMENT_PASSED"
    | "FINAL_ACCEPTED"
    | "REJECTED"
    | "CANCEL";
}

interface ReqChangeProfileData {
  title: string;
  height: number;
  weight: number;
  introduce: string;
  thumbnail: string;
  images: string[];
  experiences: {
    artworkName: string;
    artworkPart: string;
    troupe: string;
    startDate: string;
    endDate: string;
  }[];
}

export const requestCastsStatus = async () => {
  const res = await request({
    method: "get",
    endpoint: "users/casts/status",
  });

  return res;
};

export const requestChangeUserType = async (data: ReqChangeUserTypeParams) => {
  const res = await request({
    method: "put",
    endpoint: "users/type",
    data,
  });

  return res;
};

export const requestScraps = async (params: ReqScrapsParams) => {
  const { limit, offset } = params;
  const res = await request({
    method: "get",
    endpoint: `users/scraps?limit=${limit}&offset=${offset}`,
  });

  return res;
};

export const requestAppliedCasts = async (params: ReqAppliedCastsParams) => {
  const { limit, offset, status } = params;
  const res = await request({
    method: "get",
    endpoint: `users/casts?limit=${limit}&offset=${offset}&status=${status}`,
  });

  return res;
};

export const requestCancelApply = async (applyId: number) => {
  const res = await request({
    method: "put",
    endpoint: `users/casts?applyId=${applyId}`,
  });

  return res;
};

export const requestProfileList = async () => {
  const res = await request({
    method: "get",
    endpoint: "users/profiles",
  });

  return res;
};

export const requestProfileDetail = async (profileId: string) => {
  const res = await request({
    method: "get",
    endpoint: `users/profiles/${profileId}`,
  });

  return res;
};

export const requestSaveProfile = async (
  data: ReqChangeProfileData,
  profileId: string
) => {
  const res = await request({
    method: "put",
    endpoint: `users/profiles/${profileId}`,
    data,
  });

  return res;
};

export const requestChangeEmailToken = async (email: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/change-email?email=${email}`,
  });

  return res;
};

export const requestVerifyEmailToken = async (token: string, code: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/change-email?email=${code}`,
    header: { "Change-Email-Request-Token": `${token}` },
  });

  return res;
};

export const requestChangeEmail = async (token: string) => {
  const res = await request({
    method: "put",
    endpoint: "users/change-email",
    header: { "Change-Email-Update-Token": `${token}` },
  });

  return res;
};
