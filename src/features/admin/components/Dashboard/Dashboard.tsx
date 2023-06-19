import { useLocation, useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAccessToken, useLogout, useUser } from '@/stores/auth-slice';

import { useUsersByApplicationId } from '../../api/getUsersByApplicationId';

export const Dashboard = () => {
  const user = useUser();
  const axiosPrivate = useAxiosPrivate();
  const token = useAccessToken();
  const logout = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const allUsers = useUsersByApplicationId({
    applicationId: user?.applicationId as string,
    axiosPrivate,
    config: { enabled: !!user?.email && !!token },
  });

  if (allUsers.error) {
    return <div>{JSON.stringify(allUsers.error)}</div>;
  }

  if (allUsers.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <button
        onClick={() => {
          logout();
          navigate('/', { state: location, replace: true });
        }}
      >
        logout
      </button>
      <div>{JSON.stringify(allUsers.data)}</div>
    </>
  );
};
