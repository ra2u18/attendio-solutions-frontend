import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { Suspense as SuspenseFallback, Error as ErrorFallback } from '@/components/Fallbacks';
import { queryClient } from '@/lib/react-query';

import { AuthProvider } from './AuthProvider';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <AuthProvider>
              <Router>{children}</Router>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
