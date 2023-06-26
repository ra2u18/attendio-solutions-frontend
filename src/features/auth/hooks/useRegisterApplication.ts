import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';

import { useAlert } from '@/components';
import { CustomErrorResponse } from '@/lib/errors';
import { registerAppFn } from '@/services/api/(auth)';
import { LOGIN_SUCCESS_MSG, NETWORK_ERR_MSG, REGISTER_APP_EXISTS } from '@/services/api/constants';
import { AppRegisterInput } from '@/types/auth';

export const useRegisterApplication = () => {
  const { notify } = useAlert();

  return useMutation((payload: AppRegisterInput) => registerAppFn(payload), {
    onSuccess: async () => {
      notify({ text: LOGIN_SUCCESS_MSG, variant: 'success' });
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
        customError.message.toLocaleLowerCase() === 'application exists already'
      ) {
        notify({ text: REGISTER_APP_EXISTS, variant: 'warning' });
      }
    },
  });
};
