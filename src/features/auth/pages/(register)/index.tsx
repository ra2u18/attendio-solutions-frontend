import { FieldValues, SubmitHandler } from 'react-hook-form';

import { RegisterForm, Logo, Alert, useAlert } from '@/components';
import { Layout, useRegisterApplication } from '@/features/auth';
import { AppRegisterInput } from '@/types/auth';

type Props = NonNullable<unknown>;
export const Register: React.FC<Props> = () => {
  const { alert, removeAlert } = useAlert();

  const { mutate: registerApp, isLoading } = useRegisterApplication();

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
            {alert && (
              <Alert
                text={alert.text}
                dismissNotification={() => removeAlert()}
                variant={alert.variant || 'danger'}
              />
            )}
          </div>
          <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
