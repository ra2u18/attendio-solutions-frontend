import { useLocation, useNavigate } from 'react-router-dom';

import { SYSTEM_ROLES } from '@/config/permissions';
import Layout from '@/features/auth/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import axios from '@/lib/axios';

type Props = NonNullable<unknown>;

export const Login: React.FC<Props> = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname;

  const login = async () => {
    try {
      const response = await axios.post(
        'api/v1/users/signin',
        {
          applicationId: '246f101f-56a8-41c5-9bb9-11cb63f038af',
          email: 'test@gmail.com',
          password: 'password',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const sessionId = response?.data?.sessionId;
      const role = response?.data?.roleName;
      const permissions = response?.data?.permissions;

      setAuth({ accessToken, sessionId, role, permissions });

      if (role === SYSTEM_ROLES.APPLICATION_USER)
        navigate(from || '/app/dashboard-employee', { replace: true });
      else if (role === SYSTEM_ROLES.SUPER_USER)
        navigate(from || '/app/dashboard-admin', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="SignIn to your account">
      <button className="bg-red-200" onClick={() => login()}>
        Hello there
      </button>
    </Layout>
  );
};
