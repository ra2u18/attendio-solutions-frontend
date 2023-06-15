import { useContext, useDebugValue } from 'react';

import AuthContext from '@/providers/AuthProvider';

export const useAuth = () => {
  const { auth } = useContext<any>(AuthContext);

  useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));
  return useContext<any>(AuthContext);
};
