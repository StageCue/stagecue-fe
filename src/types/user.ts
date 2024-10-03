export type UserType = "ADMIN" | "PERFORMER" | "TROUPE";

export interface LoginInputs {
  email: string;
  password: string;
}

export interface SignupInputs {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
  certificated: boolean;
  birthday: string;
  gender: string;
  confirmPassword: string;
  ageCheck: boolean;
  agreeServicePolicy: boolean;
  agreePrivatePolicy: boolean;
}

export interface ForgotAccountInputs {
  phoneNumber: string;
  certCode: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}
