import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Suspense as SuspenseFallback } from '@/components/Fallbacks';
import { BaseLayout } from '@/components/Layout/BaseLayout';
import { lazyImport } from '@/utils/lazyImport';

const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing');

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
    path: '/',
    element: <App />,
    children: [{ path: '', element: <Landing /> }],
  },
];
