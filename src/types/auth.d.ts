import { ALL_PERMISSIONS } from '@/config/permissions';

export type UserState = {
  applicationId: string;
  id: string;
  email: string;
  roleName: string;
  name: string;
  permissions: (typeof ALL_PERMISSIONS)[];
};

// React query types

/** Login user to app types */
export type LoginUserInput = {
  email: string;
  password: string;
  applicationId: string;
};

export type LoginUserOutput = {
  accessToken: string;
  sessionId: string;
  role: string;
  applicationId: string;
};

/** Register app types */
export type AppRegisterInput = {
  email: string;
  companyName: string;
  fullname: string;
};

export type AppRegisterOutput = {
  applicationId: string;
  userId: string;
  email: string;
  roleId: string;
  roleName: string;
};

/** Verify OTP types */
export type VerifyOTPInput = {
  token: string;
  password: string;
  confirmPassword: string;
};

/** Forgot pwd types */
export type ForgotPwdInput = {
  email: string;
  applicationId: string;
};
