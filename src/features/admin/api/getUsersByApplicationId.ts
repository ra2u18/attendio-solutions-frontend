import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

type TestUserType = {
  users: Array<{ name: string }>;
};

export const getUsers = (
  applicationId: string,
  axiosPrivate: AxiosInstance
): Promise<TestUserType> => {
  return axiosPrivate.get(`users/all_users`, {
    params: { application_id: applicationId },
  });
};

type QueryFnType = typeof getUsers;
type UseUsersOptions = {
  axiosPrivate: AxiosInstance;
  applicationId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useUsersByApplicationId = ({
  applicationId,
  config,
  axiosPrivate,
}: UseUsersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    enabled: !!config?.enabled,
    queryKey: ['users', 'all_users', applicationId],
    queryFn: () => getUsers(applicationId, axiosPrivate),
  });
};
