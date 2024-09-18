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
  cell: string;
}

interface ReqLoginParams {
  email: string;
  password: string;
}

export const requestLogin = async (data: ReqLoginParams) => {
  const res = await request({
    method: "post",
    endpoint: "v1/auth/login",
    data,
  });

  const { accessToken } = res.result;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return res;
};

export const requestSignup = async (data: ReqSignupParams) => {
  const res = await request({
    method: "post",
    endpoint: "v1/auth/register",
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
    endpoint: "v1/auth/register-cell",
    data,
  });
  return res;
};
