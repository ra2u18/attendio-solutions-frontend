import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { RegisterForm, Logo } from '@/components';
import { ErrorAlert } from '@/components/Alerts';
import { Layout, registerAppFn } from '@/features/auth';
import { CustomError } from '@/lib/errors';
import { AppRegisterInput } from '@/types/auth';

type Props = NonNullable<unknown>;

enum RegisterStatus {
  success = 'success',
  error = 'error',
  default = 'default',
}

export const Register: React.FC<Props> = () => {
  const [registerStatus, setRegisterStatus] = useState<RegisterStatus>(RegisterStatus.default);

  const { mutate: registerApp, isLoading } = useMutation(
    (payload: AppRegisterInput) => registerAppFn(payload),
    {
      onSuccess: async () => {
        // Success toast
        toast.success('Application registered');
        setRegisterStatus(RegisterStatus.success);
      },
      onError: (err: CustomError) => {
        setRegisterStatus(RegisterStatus.error);
        console.log('err', { err });
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    registerApp(data as AppRegisterInput);
  };

  return (
    <Layout title="Sign Up">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
          <div>
            {registerStatus === RegisterStatus.success && <p>Check your email etc...</p>}
            {registerStatus === RegisterStatus.error && (
              <ErrorAlert title="Could not register, please try again!" />
            )}
          </div>
          <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
