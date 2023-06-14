import { Suspense } from 'react';

import { Suspense as SuspenseFallback } from '@/components/Fallbacks';

type Props = {
  children: React.ReactNode;
};

export const AppProviders: React.FC<Props> = ({ children }) => {
  return <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>;
};
