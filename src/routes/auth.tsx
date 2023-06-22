import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AlertsManagerProvider } from '@/components/Alerts/AlertManager';
import { Suspense as SuspenseFallback } from '@/components/Fallbacks';
import { BaseLayout } from '@/components/Layout/BaseLayout';
import { RedirectAuthedUser } from '@/lib/Authorization';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Register } = lazyImport(() => import('@/features/auth'), 'Register');
const { VerifyOTP } = lazyImport(() => import('@/features/auth'), 'VerifyOTP');
const { RequestNewOTP } = lazyImport(() => import('@/features/auth'), 'RequestNewOTP');

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
    path: '/auth',
    element: (
      <RedirectAuthedUser>
        <AlertsManagerProvider>
          <App />
        </AlertsManagerProvider>
      </RedirectAuthedUser>
    ),
    children: [
      { path: 'signin', element: <Login /> },
      { path: 'signup', element: <Register /> },
      { path: 'verify-otp', element: <VerifyOTP /> },
      { path: 'refresh-otp', element: <RequestNewOTP /> },
      // { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
];
