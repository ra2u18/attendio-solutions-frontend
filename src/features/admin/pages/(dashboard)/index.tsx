import { Spinner } from '@/components/Elements';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useUsersByApplicationId } from '@/services/api/(admin)';
import { socketService } from '@/services/socket/socket.service';
import { useAccessToken, useLogout, useUser } from '@/stores/auth-slice';

export const Dashboard = () => {
  const user = useUser();
  const axiosPrivate = useAxiosPrivate();
  const token = useAccessToken();
  const logout = useLogout();

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
        }}
      >
        logout
      </button>
      <button
        onClick={() => {
          socketService.emitMessage('checkinEvent', 'checkin in is the best part');
        }}
      >
        checkin
      </button>

      <button
        onClick={() => {
          socketService.emitMessage('checkoutEvent', 'checkout is the worse part');
        }}
      >
        checkin
      </button>

      <div>{JSON.stringify(allUsers.data)}</div>
    </>
  );
};
