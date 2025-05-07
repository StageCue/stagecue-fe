import request from '@/api/index';
import { queryParams as _queryParams } from '@/utils/queryParams';
interface ReqSignupParams {
  token: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  terms?: boolean;
  userType?: string;
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
  phoneNumber: string;
  token: string;
}

interface ReqResetPasswordEmailParams {
  email: string;
}

interface ReqChangePassword {
  email: string;
  newPassword: string;
  token: string;
}

export const requestLogin = async (data: ReqLoginParams) => {
  const res = await request({
    method: 'post',
    endpoint: 'auth/login',
    data,
  });

  return res;
};

export const requestRefreshSession = async (refreshToken: string) => {
  const res = await request({
    method: 'get',
    endpoint: 'auth/token/refresh',
    header: {
      'Auth-Refresh-Token': refreshToken,
    },
  });

  return res;
};

export const requestSignup = async (data: ReqSignupParams) => {
  const res = await request({
    method: 'post',
    endpoint: 'auth/signup',
    data,
  });

  return res;
};

export const requestCellPhoneCertCode = async (data: ReqCellPhoneCertCode) => {
  const { phoneNumber } = data;

  const res = await request({
    method: 'post',
    endpoint: `auth/signup/phone-number/request?phoneNumber=${phoneNumber}`,
  });
  return res;
};

export const requestVerifySignup = async (data: ReqVerifySignupParams) => {
  const { phoneNumber, token } = data;
  const res = await request({
    method: 'post',
    endpoint: `auth/signup/phone-number/verify?phoneNumber=${phoneNumber}&token=${token}`,
  });
  return res;
};

export const requestFindAccountCode = async (data: ReqCellPhoneCertCode) => {
  const queryParams = _queryParams<ReqCellPhoneCertCode>(data);

  const res = await request({
    method: 'post',
    endpoint: `auth/find-account/request?${queryParams}`,
  });
  return res;
};

export const requestVerifyFindAccountCode = async (data: ReqVerifySignupParams) => {
  const queryParams = _queryParams<ReqVerifySignupParams>(data);

  const res = await request({
    method: 'post',
    endpoint: `auth/find-account/verify?${queryParams}`,
  });
  return res;
};

export const requestFindAccount = async (data: ReqFindAccountParams) => {
  const queryParams = _queryParams<ReqFindAccountParams>(data);

  const res = await request({
    method: 'get',
    endpoint: `auth/find-account?${queryParams}`,
  });

  return res;
};

export const requestResetPasswordEmail = async (email: string) => {
  const queryParams = _queryParams<ReqResetPasswordEmailParams>({ email });

  const res = await request({
    method: 'post',
    endpoint: `auth/change-password/request?${queryParams}`,
  });

  return res;
};

export const requestResetPasswordFromMail = async (data: ReqChangePassword) => {
  const res = await request({
    method: 'put',
    endpoint: 'auth/change-password',
    data,
    header: { 'Auth-Change-Password-Token': `${data.token}` },
  });

  return res;
};
