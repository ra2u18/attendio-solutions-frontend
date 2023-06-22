import { SubmitHandler, FieldValues } from 'react-hook-form';

import { Alert, LoginForm, Logo, useAlert } from '@/components';
import { Layout } from '@/features/auth';
import { LoginUserInput } from '@/types/auth';

import { useLogin } from '../hooks/useLogin';

type Props = NonNullable<unknown>;

export const Login: React.FC<Props> = () => {
  const { alert, removeAlert } = useAlert();
  const { mutate: loginUser, isLoading } = useLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    loginUser(data as LoginUserInput);
  };

  return (
    <Layout title="SignIn to your account">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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

          <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
