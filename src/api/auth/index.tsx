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

export const requestSignup = (data: ReqSignupParams) => {
  const res = request({ method: "POST", endpoint: "v1/auth/register", data });
  return res;
};
