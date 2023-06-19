import { HttpStatusCode } from 'axios';
import { useEffect } from 'react';

import { axiosPrivate } from '@/lib/axios';
import { CustomErrorResponse } from '@/lib/errors';
import { useAccessToken } from '@/stores/auth-slice';

import useRefreshToken from './useRefreshToken';

const notAuthorized = (error: CustomErrorResponse) => {
  const regexMessage = /forbidden/i;
  return error.statusCode === HttpStatusCode.Forbidden && regexMessage.test(error.message);
};

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken = useAccessToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization'] && accessToken) {
          config.headers['authorization'] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log('Run response intercept');
        const prevRequest = error?.config;

        if (notAuthorized(error.response.data) && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          // TODO: optimize, if newAccessToken is not correct, don't send the 2nd request
          prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
