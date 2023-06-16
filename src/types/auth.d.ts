import { ALL_PERMISSIONS } from '@/config/permissions';

export type UserState = {
  applicationId: string;
  userId: string;
  email: string;
  roleName: string;
  permissions: (typeof ALL_PERMISSIONS)[];
};
