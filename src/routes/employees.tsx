import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Suspense as SuspenseFallback } from '@/components/Fallbacks';
import { BaseLayout } from '@/components/Layout/BaseLayout';
import { SYSTEM_ROLES } from '@/config/permissions';
import { RequirePoliciesRoute } from '@/lib/Authorization';
import { lazyImport } from '@/utils/lazyImport';

const { Dashboard } = lazyImport(() => import('@/features/employee'), 'Dashboard');

type Props = NonNullable<unknown>;

const App: React.FC<Props> = () => {
  return (
    <BaseLayout>
      <Suspense fallback={<SuspenseFallback />}>
        <Outlet />
      </Suspense>
    </BaseLayout>
  );
};

export const routes = [
  {
    path: '/app/dashboard-employee',
    element: (
      <RequirePoliciesRoute allowedRoles={[SYSTEM_ROLES.APPLICATION_USER]}>
        <App />
      </RequirePoliciesRoute>
    ),
    children: [{ path: '', element: <Dashboard /> }],
  },
];
