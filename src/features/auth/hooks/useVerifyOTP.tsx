import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

import { useAlert } from '@/components';
import { CustomErrorResponse } from '@/lib/errors';
import { verifyOTPFn } from '@/services/api/(auth)';
import { NETWORK_ERR_MSG, OTP_EXPIRED_MSG } from '@/services/api/constants';
import { VerifyOTPInput } from '@/types/auth';

type Props = { variant: string };
const OTPRecoverable: React.FC<Props> = ({ variant }) => {
  const { removeAlert } = useAlert();

  return (
    <div
      className={`inline-block border-b py-1 border-gray-300 text-sm font-medium text-${variant}-800
  hover:border-gray-500`}
    >
      <Link to="/auth/refresh-otp" onClick={() => removeAlert()}>
        Refresh OTP
      </Link>
    </div>
  );
};

export const useVerifyOTP = () => {
  const { notify } = useAlert();
  const navigate = useNavigate();

  return useMutation((payload: VerifyOTPInput) => verifyOTPFn(payload), {
    onSuccess: () => {
      toast.success('OTP changed, log in!');
      navigate('/auth/signin', { replace: true });
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
        customError.message === 'Invalid code'
      ) {
        notify({
          text: OTP_EXPIRED_MSG,
          variant: 'warning',
          children: <OTPRecoverable variant="yellow" />,
        });
      }
    },
  });
};
