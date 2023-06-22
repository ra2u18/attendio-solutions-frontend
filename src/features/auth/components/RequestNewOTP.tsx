import { useEffect } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

import { Alert, Logo, RequestNewOTPForm, useAlert } from '@/components';
import { Layout, REQUEST_OTP_ON_MOUNT } from '@/features/auth';
import { ForgotPwdInput } from '@/types/auth';

import { useRefreshOTP } from '../hooks/useRefreshOTP';

type Props = NonNullable<unknown>;
export const RequestNewOTP: React.FC<Props> = () => {
  const { alert, notify, removeAlert } = useAlert();
  const { mutate: refreshOTP, isLoading } = useRefreshOTP();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    refreshOTP(data as ForgotPwdInput);
  };

  useEffect(() => {
    notify({ text: REQUEST_OTP_ON_MOUNT, variant: 'success' });
  }, []);

  return (
    <Layout title="Sign Up">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Request new OTP
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg">
          {alert && (
            <Alert
              text={alert.text}
              variant={alert.variant}
              dismissNotification={() => removeAlert()}
            >
              {alert.children}
            </Alert>
          )}
          <RequestNewOTPForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
