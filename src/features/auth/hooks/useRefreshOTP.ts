import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';

import { useAlert } from '@/components';
import {
  NETWORK_ERR_MSG,
  forgotPwdFn,
  INVALID_CREDENTIALS,
  REQUEST_OTP_SUCCESS,
} from '@/features/auth';
import { CustomErrorResponse } from '@/lib/errors';
import { ForgotPwdInput } from '@/types/auth';

export const useRefreshOTP = () => {
  const { notify } = useAlert();

  return useMutation((payload: ForgotPwdInput) => forgotPwdFn(payload), {
    onSuccess: () => {
      notify({ text: REQUEST_OTP_SUCCESS, variant: 'success' });
      toast.success('OTP changed, log in!');
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
        customError.message.toLowerCase().includes('user does not exist')
      ) {
        notify({ text: INVALID_CREDENTIALS, variant: 'warning' });
      }
    },
  });
};
