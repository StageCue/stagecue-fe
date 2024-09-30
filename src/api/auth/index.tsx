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

export const requestLogin = async (data: ReqLoginParams) => {
  const res = await request({
    method: "post",
    endpoint: "auth/login",
    data,
  });

  const { accessToken } = res;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return res;
};

export const requestRefreshSession = async () => {};

export const requestSignup = async (data: ReqSignupParams) => {
  const res = await request({
    method: "post",
    endpoint: "auth/register",
    data,
    header: { "Auth-Register-Token": "4d2146b8-cdec-4402-8943-35d447539a96" },
  });

  const [accessToken] = res.data;
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
