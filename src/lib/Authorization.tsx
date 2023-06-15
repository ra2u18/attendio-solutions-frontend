import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { SYSTEM_ROLES } from '@/config/permissions';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  children: React.ReactNode;
  allowedRoles?: any;
  policyCheck?: any;
};

export const RequirePoliciesRoute = ({ policyCheck, allowedRoles }: Props) => {
  const auth = useAuth();
  const location = useLocation();

  const userHasRequiredRole = allowedRoles?.includes(auth?.role);
  const userHasRequiredPermission = auth?.permissions?.find((permission: string) =>
    policyCheck?.includes(permission)
  );

  return userHasRequiredRole || userHasRequiredPermission ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/signin" state={{ from: location }} replace />
  );
};

export const RequireAccessChildren = ({ policyCheck, allowedRoles, children }: Props) => {
  const auth = useAuth();

  const userHasRequiredRole = allowedRoles?.includes(auth?.role);
  const userHasRequiredPermission = auth?.permissions?.find((permission: string) =>
    policyCheck?.includes(permission)
  );

  return userHasRequiredRole || userHasRequiredPermission ? children : null;
};

export const RedirectAuthedUser: React.FC<Props> = ({ children }) => {
  const auth = useAuth();

  console.log(auth);

  // Exit early if not authenticated
  if (!auth.accessToken) return children;

  switch (auth.role) {
    case SYSTEM_ROLES.SUPER_USER:
      return <Navigate to="/app/dashboard-admin" replace />;
    case SYSTEM_ROLES.APPLICATION_USER:
      return <Navigate to="/app/dashboard-employee" replace />;
    default:
      return null; // return null if the role is not admin or employee
  }
};
