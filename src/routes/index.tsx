import { useRoutes } from 'react-router-dom';

import { SYSTEM_ROLES } from '@/config/permissions';
import Landing from '@/features/misc/components/Landing';

import { routes as adminRoutes } from './admin';
import { routes as employeeRoutes } from './employees';
import { routes as publicWithRedirect } from './public';

// import { NotFound } from '@/components/Fallbacks';

type Props = NonNullable<unknown>;

export const AppRoutes: React.FC<Props> = () => {
  const auth = { isAuthed: false, role: SYSTEM_ROLES.SUPER_USER }; // change this lated into proper authentication mechanism

  const commonRoutes = [{ path: '/', element: <Landing /> }];
  // const fallbackRoute = { path: '*', element: <NotFound /> };

  const routes = auth.isAuthed
    ? auth.role === SYSTEM_ROLES.SUPER_USER
      ? adminRoutes
      : employeeRoutes
    : publicWithRedirect;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
