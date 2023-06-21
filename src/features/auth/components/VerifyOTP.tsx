import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Logo } from '@/components';
import { ErrorAlert } from '@/components/Alerts';
import { VerifyOTPForm } from '@/components/Forms/VerifyOTPForm';
import { Layout, verifyOTPFn } from '@/features/auth';
import { CustomError } from '@/lib/errors';
import { VerifyOTPInput } from '@/types/auth';

type Props = NonNullable<unknown>;
export const VerifyOTP: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState<string[]>([]);

  const { mutate: verifyOTP, isLoading } = useMutation(
    (payload: VerifyOTPInput) => verifyOTPFn(payload),
    {
      onSuccess: () => {
        toast.success('OTP changed, log in!');
        navigate('/auth/signin', { replace: true });
      },
      onError: (err: AxiosError) => {
        const customError = err.response?.data as CustomError;
        setErrors([customError.message]);
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = { ...data, token: searchParams.get('token') || '' } as VerifyOTPInput;

    verifyOTP(payload);
  };

  return (
    <Layout title="Sign Up">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
          {errors.length > 0 && <ErrorAlert errors={errors} title="OTP error" />}
          <VerifyOTPForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
