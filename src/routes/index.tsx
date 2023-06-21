import { useRoutes } from 'react-router-dom';

import { NotFound } from '@/components/Fallbacks';
import { SYSTEM_ROLES } from '@/config/permissions';
import { useRoleAndPermissions } from '@/stores/auth-slice';

import { routes as adminRoutes } from './admin';
import { routes as publicWithRedirect } from './auth';
import { routes as employeeRoutes } from './employees';
import { routes as commonRoutes } from './public';

type Props = NonNullable<unknown>;

export const AppRoutes: React.FC<Props> = () => {
  const { role } = useRoleAndPermissions();
  const fallbackRoute = { path: '*', element: <NotFound /> };
  const routes = role === SYSTEM_ROLES.SUPER_USER ? adminRoutes : employeeRoutes;

  const element = useRoutes([...routes, ...commonRoutes, ...publicWithRedirect, fallbackRoute]);

  return <>{element}</>;
};
