export type UserType = "member" | "owner";

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
  confirmPassword: string;
  allAgreed: boolean;
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
