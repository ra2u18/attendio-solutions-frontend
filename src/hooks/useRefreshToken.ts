import { HttpStatusCode } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from '@/lib/axios';
import { CustomError } from '@/lib/errors';
import { queryClient } from '@/lib/react-query';
import { useLogout, useSetAccessToken, useUser } from '@/stores/auth-slice';

const useRefreshToken = () => {
  const setAccessToken = useSetAccessToken();
  const user = useUser();

  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async (): Promise<string | undefined> => {
    console.log('refresh activate');

    try {
      const response = await axios.post(
        'users/refresh-token',
        {
          userId: user?.id,
          applicationId: user?.applicationId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== HttpStatusCode.Ok)
        throw new CustomError('Unauthorized', HttpStatusCode.Unauthorized);

      const token = response.data?.accessToken;
      setAccessToken(token);
      return token;
    } catch (err: any) {
      logout();
      navigate('/', { state: location, replace: true });
      queryClient.clear();

      return undefined;
    }
  };

  return refresh;
};

export default useRefreshToken;
