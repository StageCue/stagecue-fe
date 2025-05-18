export type UserType = 'ADMIN' | 'PERFORMER' | 'TROUPE';

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
  userType: string;
}

export interface ForgotAccountInputs {
  phoneNumber: string;
  certCode: string;
  certificated: boolean;
}

export interface ForgotPasswordInput {
  email: string;
  token: string;
  newPassowrd: string;
}

export interface PasswordInputs {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordInputs {
  newPassword: string;
  confirmPassword: string;
}
