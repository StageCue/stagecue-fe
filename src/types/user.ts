export type UserType = "member" | "owner";

export interface LoginInputs {
  email: string;
  password: string;
}

export interface SignupInputs {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
