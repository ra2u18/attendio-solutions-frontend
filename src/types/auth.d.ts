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
export type LoginUserInput = {
  email: string;
  password: string;
  applicationId: string;
};

export type LoginUserOutput = {
  accessToken: string;
  sessionId: string;
  role: string;
};
