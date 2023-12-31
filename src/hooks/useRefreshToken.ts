import { HttpStatusCode } from 'axios';

import { CustomError } from '@/lib/errors';
import axios from '@/services/api/axios';
import { useLogout, useSetAccessToken, useUser } from '@/stores/auth-slice';

const useRefreshToken = () => {
  const setAccessToken = useSetAccessToken();
  const user = useUser();
  const logout = useLogout();

  const refresh = async (): Promise<string | undefined> => {
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

      return undefined;
    }
  };

  return refresh;
};

export default useRefreshToken;
