export const ALL_PERMISSIONS = [
  'user:create',
  'user:modify',
  'user:delete',

  'employee:attendance:submit',
  'employee:attendance:approve',
  'employee:attendance:edit',
  'employee:statistics:read',

  'application:modify',
  'application:settings:modify',
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
  acc[permission] = permission;

  return acc;
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>);

export const USER_ROLE_PEMISSIONS = [PERMISSIONS['employee:attendance:submit']];

export const SUPER_USER_ROLE_PERMISSIONS = [...ALL_PERMISSIONS];

export const SYSTEM_ROLES = {
  SUPER_USER: 'SUPER_USER',
  APPLICATION_USER: 'APPLICATION_USER',
};
