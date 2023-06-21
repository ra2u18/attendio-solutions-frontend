import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import toaster from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo } from '@/components/Elements/Logo';
import { LoginForm } from '@/components/Forms/LoginForm/LoginForm';
import { SYSTEM_ROLES } from '@/config/permissions';
import Layout from '@/features/auth/layout/Layout';
import { CustomError } from '@/lib/errors';
import { useSetAccessToken, useSetSessionId } from '@/stores/auth-slice';
import { LoginUserInput, LoginUserOutput } from '@/types/auth';

import { loginUserFn } from '../api';

type Props = NonNullable<unknown>;

export const Login: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const setAccessToken = useSetAccessToken();
  const setSessionId = useSetSessionId();

  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginUserInput) => loginUserFn(userData),
    {
      onSuccess: async (data: LoginUserOutput) => {
        const { accessToken, sessionId, role } = data;
        // success toast
        setAccessToken(accessToken);
        setSessionId(sessionId);

        if (role === SYSTEM_ROLES.APPLICATION_USER)
          navigate(from || '/app/dashboard-employee', { replace: true });
        else if (role === SYSTEM_ROLES.SUPER_USER)
          navigate(from || '/app/dashboard-admin', { replace: true });
      },
      onError: (err: CustomError) => {
        toaster.error('Could not log in');
        console.log('err', { err });
        // toast the error, clear the fields, set retry counts after block
      },
    }
  );

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
          <LoginForm isLoading={isLoading} onSubmit={onSubmit} />
        </div>
      </div>
    </Layout>
  );
};
