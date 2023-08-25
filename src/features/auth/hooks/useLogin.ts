import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAlert } from '@/components';
import { SYSTEM_ROLES } from '@/config/permissions';
import { CustomErrorResponse } from '@/lib/errors';
import { loginUserFn } from '@/services/api/(auth)';
import { NETWORK_ERR_MSG, PASSWORD_NOT_SET, INVALID_CREDENTIALS } from '@/services/api/constants';
import { useSetAccessToken, useSetSessionId } from '@/stores/auth-slice';
import { LoginUserInput, LoginUserOutput } from '@/types/auth';

export const useLogin = () => {
  const setAccessToken = useSetAccessToken();
  const setSessionId = useSetSessionId();

  const { notify } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  return useMutation((userData: LoginUserInput) => loginUserFn(userData), {
    onSuccess: async (data: LoginUserOutput) => {
      const { accessToken, sessionId, role } = data;

      console.log(accessToken, sessionId);

      // Set state
      setAccessToken(accessToken);
      setSessionId(sessionId);

      if (role === SYSTEM_ROLES.APPLICATION_USER)
        navigate(from || '/app/dashboard-employee', { replace: true });
      else if (role === SYSTEM_ROLES.SUPER_USER)
        navigate(from || '/app/dashboard-admin', { replace: true });
    },
    onError: (err: AxiosError) => {
      const customError = err.response?.data as CustomErrorResponse;
      if (
        err.code === AxiosError.ERR_NETWORK ||
        customError.statusCode === HttpStatusCode.InternalServerError
      ) {
        notify({ text: NETWORK_ERR_MSG, variant: 'danger' });
      }

      if (
        customError.statusCode === HttpStatusCode.BadRequest &&
        customError.message.toLowerCase().includes('password not set')
      ) {
        notify({ text: PASSWORD_NOT_SET, variant: 'warning' });
      }

      if (
        customError.statusCode === HttpStatusCode.Unauthorized &&
        customError.message.toLowerCase().includes('invalid credentials')
      ) {
        notify({ text: INVALID_CREDENTIALS, variant: 'warning' });
      }
    },
  });
};
