import request from "@/api/index";
import axios from "axios";

interface ReqSignupParams {
  username: string;
  email: string;
  password: string;
  cell: string;
  birthday: string;
  gender: string;
  terms: boolean;
}

interface ReqCellPhoneCertCode {
  phoneNumber: string;
}

interface ReqLoginParams {
  email: string;
  password: string;
}

interface ReqVerifySignupParams {
  phoneNumber: string;
  token: string;
}

interface ReqFindAccountParams {
  findAccountToken: string;
}

interface ReqChangePassword {
  newPassword: string;
  token: string;
}

export const requestLogin = async (data: ReqLoginParams) => {
  const res = await request({
    method: "post",
    endpoint: "auth/login",
    data,
  });

  return res;
};

export const requestRefreshSession = async (refreshToken: string) => {
  const res = await request({
    method: "get",
    endpoint: "auth/token/refresh",
    header: {
      "Auth-Refresh-Token": refreshToken,
    },
  });

  return res;
};

export const requestSignup = async (
  data: ReqSignupParams,
  registerToken: string
) => {
  const res = await request({
    method: "post",
    endpoint: "auth/signup",
    data,
    header: { "Auth-Signup-Token": `${registerToken}` },
  });

  const { accessToken } = res;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return res;
};

export const requestCellPhoneCertCode = async (data: ReqCellPhoneCertCode) => {
  const res = await request({
    method: "post",
    endpoint: "auth/claim-signup-verification",
    data,
  });
  return res;
};

export const requestVerifySignup = async (data: ReqVerifySignupParams) => {
  const { phoneNumber, token } = data;
  const res = await request({
    method: "get",
    endpoint: `auth/verify-signup?phoneNumber=${phoneNumber}&token=${token}`,
  });
  return res;
};

export const requestFindAccountCode = async (data: ReqCellPhoneCertCode) => {
  const res = await request({
    method: "post",
    endpoint: "auth/claim-find-account",
    data,
  });
  return res;
};

export const requestVerifyFindAccountCode = async (
  data: ReqVerifySignupParams
) => {
  const { phoneNumber, token } = data;
  const res = await request({
    method: "get",
    endpoint: `auth/verify-find-account?phoneNumber=${phoneNumber}&token=${token}`,
  });
  return res;
};

export const requestFindAccount = async (data: ReqFindAccountParams) => {
  const { findAccountToken } = data;
  const res = await request({
    method: "get",
    endpoint: "auth/find-account",
    header: { "Auth-Find-Account-Token": `${findAccountToken}` },
  });

  return res;
};

export const requestResetPasswordEmail = async (email: string) => {
  const res = await request({
    method: "get",
    endpoint: `auth/claim-password-reset?email=${email}`,
  });

  return res;
};

export const requestResetPasswordFromMail = async (data: ReqChangePassword) => {
  const res = await request({
    method: "put",
    endpoint: "auth/change-password",
    data,
    header: { "Auth-Change-Password-Token": `${data.token}` },
  });

  return res;
};
