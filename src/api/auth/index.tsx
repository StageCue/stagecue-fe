import request from "@/api/index";

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

export const requestSignup = async (data: ReqSignupParams) => {
  const res = await request({
    method: "POST",
    endpoint: "v1/auth/register",
    data,
  });
  return res;
};

export const requestCellPhoneCertCode = async (data: ReqCellPhoneCertCode) => {
  const res = await request({
    method: "POST",
    endpoint: "v1/auth/register-cell",
    data,
  });
  return res;
};
