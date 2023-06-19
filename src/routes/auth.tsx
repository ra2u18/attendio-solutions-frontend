import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Suspense as SuspenseFallback } from '@/components/Fallbacks';
import { BaseLayout } from '@/components/Layout/BaseLayout';
import { Login } from '@/features/auth/components';
import { RedirectAuthedUser } from '@/lib/Authorization';

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
        <App />
      </RedirectAuthedUser>
    ),
    children: [
      { path: 'signin', element: <Login /> },
      // { path: 'forgot-password', element: <ForgotPassword /> },
      // { path: 'verify-otp', element: <VerifyOTP /> }
    ],
  },
];
