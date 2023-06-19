import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { SYSTEM_ROLES } from '@/config/permissions';
import { useRoleAndPermissions } from '@/stores/auth-slice';

type Props = {
  children: React.ReactNode;
  allowedRoles?: any;
  policyCheck?: any;
};

export const RequirePoliciesRoute = ({ policyCheck, allowedRoles }: Props) => {
  const { permissions, role, accessToken } = useRoleAndPermissions();

  const location = useLocation();

  const userHasRequiredRole = allowedRoles?.includes(role);
  const userHasRequiredPermission = permissions?.find((permission) =>
    policyCheck?.includes(permission)
  );

  return userHasRequiredRole || userHasRequiredPermission ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export const RequireAccessChildren = ({ policyCheck, allowedRoles, children }: Props) => {
  const { permissions, role } = useRoleAndPermissions();

  const userHasRequiredRole = allowedRoles?.includes(role);
  const userHasRequiredPermission = permissions?.find((permission) =>
    policyCheck?.includes(permission)
  );

  return userHasRequiredRole || userHasRequiredPermission ? children : null;
};

export const RedirectAuthedUser: React.FC<Props> = ({ children }) => {
  const { accessToken, role } = useRoleAndPermissions();

  // Exit early if not authenticated
  if (!accessToken) return children;

  switch (role) {
    case SYSTEM_ROLES.SUPER_USER:
      return <Navigate to="/app/dashboard-admin" replace />;
    case SYSTEM_ROLES.APPLICATION_USER:
      return <Navigate to="/app/dashboard-employee" replace />;
    default:
      return null; // return null if the role is not admin or employee
  }
};
