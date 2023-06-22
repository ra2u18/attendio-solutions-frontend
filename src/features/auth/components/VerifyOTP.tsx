import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { Alert, Logo, VerifyOTPForm, useAlert } from '@/components';
import { Layout, useVerifyOTP } from '@/features/auth';
import { VerifyOTPInput } from '@/types/auth';

type Props = NonNullable<unknown>;

export const VerifyOTP: React.FC<Props> = () => {
  const { alert, removeAlert } = useAlert();
  const [searchParams] = useSearchParams();

  const { mutate: verifyOTP, isLoading } = useVerifyOTP();

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
          {alert && (
            <Alert
              text={alert.text}
              variant={alert.variant}
              dismissNotification={() => removeAlert()}
            >
              {alert.children}
            </Alert>
          )}
          <VerifyOTPForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
