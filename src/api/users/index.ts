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
  isDefault: boolean;
  experiences: {
    artworkName: string;
    artworkPart: string;
    troupe: string;
    startDate: string;
    endDate: string;
  }[];
}

interface ReqChangePasswordBody {
  password: string;
  confirmPassword: string;
}

interface UploadImagePrams {
  file: string;
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
    endpoint: `users/change-email-verify?code=${code}`,
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

export const requestChangePhoneToken = async (number: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/change-cell?cell=${number}`,
  });

  return res;
};

export const requestVerifyPhoneToken = async (token: string, code: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/change-cell-verify?code=${code}`,
    header: { "Change-Cell-Request-Token": `${token}` },
  });

  return res;
};

export const requestChangePhone = async (token: string) => {
  const res = await request({
    method: "put",
    endpoint: "users/change-cell",
    header: { "Change-Cell-Update-Token": `${token}` },
  });

  return res;
};

export const requestConfrimCurrentPassword = async (password: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/change-password?password=${password}`,
  });

  return res;
};

export const requestChangePassword = async (
  data: ReqChangePasswordBody,
  token: string
) => {
  const res = await request({
    method: "put",
    endpoint: "users/change-password",
    data,
    header: { "Change-Password-Update-Token": `${token}` },
  });
  return res;
};

export const requestDeleteAccountToken = async (email: string) => {
  const res = await request({
    method: "post",
    endpoint: `users/delete-account?email=${email}`,
  });

  return res;
};

export const requestVerifyDeleteAccount = async (
  token: string,
  code: string
) => {
  const res = await request({
    method: "post",
    endpoint: `users/delete-account-verify?code=${code}`,
    header: { "Delete-Account-Request-Token": `${token}` },
  });

  return res;
};

export const requestDeleteAccount = async (
  isAgreed: boolean,
  token: string
) => {
  const res = await request({
    method: "put",
    endpoint: `users/delete-account?agreed=${isAgreed}`,
    header: { "Delete-Account-Update-Token": `${token}` },
  });

  return res;
};

export const requestCreateProfile = async (data: ReqChangeProfileData) => {
  const res = await request({
    method: "post",
    endpoint: `users/profiles`,
    data,
  });

  return res;
};

export const requestUploadImage = async (data: UploadImagePrams) => {
  const res = await request({
    method: "post",
    endpoint: `users/profiles/upload-image?file=${data.file}`,
  });

  return res;
};

export const requestUploadThumbnail = async (data: UploadImagePrams) => {
  const res = await request({
    method: "post",
    endpoint: `users/profiles/upload-thumbnail?file=${data.file}`,
  });

  return res;
};
