/** Authentication service api function handlers
 *
 * @dev These endpoints use the public axios instance,since they don't
 * require authentication
 */
import { HttpStatusCode } from 'axios';

import { CustomError } from '@/lib/errors';
import axios from '@/services/api/axios';
import {
  AppRegisterInput,
  AppRegisterOutput,
  ForgotPwdInput,
  LoginUserInput,
  LoginUserOutput,
  UserState,
  VerifyOTPInput,
} from '@/types/auth';

// TODO: move this utility somewhere else
function pick<T, K extends keyof T>(source: T, ...keys: K[]): Pick<T, K> {
  const returnValues = {} as Pick<T, K>;
  keys.forEach((key) => {
    returnValues[key] = source[key];
  });

  return returnValues;
}

// TODO: finish this feature
export const verifyAccessToken = async (token: string): Promise<UserState> => {
  const response = await axios.post(
    'users/verify-access-token',
    { authorization: token },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  if (response.status !== HttpStatusCode.Ok)
    throw new CustomError('Unauthorized', HttpStatusCode.Unauthorized);

  // how can I map response.data to UserState?
  const extractKeys: Array<keyof UserState> = [
    'applicationId',
    'id',
    'email',
    'roleName',
    'name',
    'permissions',
  ];
  const userState = pick(response.data, ...extractKeys);

  console.log(userState);

  return userState;
};

export const loginUserFn = async (user: LoginUserInput): Promise<LoginUserOutput> => {
  const response = await axios.post(
    'users/signin',
    { ...user },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  if (response.status !== HttpStatusCode.Ok)
    throw new CustomError('Bad Request', HttpStatusCode.BadRequest);

  return response.data;
};

export const registerAppFn = async (payload: AppRegisterInput): Promise<AppRegisterOutput> => {
  const { companyName, email, fullname } = payload;

  const response = await axios.post(
    'applications',
    {
      companyName,
      user: { email, name: fullname },
    },
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  if (response.status !== HttpStatusCode.Created)
    throw new CustomError('Bad Request', HttpStatusCode.BadRequest);

  return response.data;
};

export const verifyOTPFn = async (payload: VerifyOTPInput): Promise<void> => {
  const response = await axios.post(
    'users/verify-otp',
    { ...payload },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.status !== HttpStatusCode.Ok)
    throw new CustomError('Bad Request', HttpStatusCode.BadRequest);
};

export const forgotPwdFn = async (payload: ForgotPwdInput): Promise<void> => {
  const response = await axios.post(
    'users/forgot-password',
    { ...payload },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.status !== HttpStatusCode.Ok)
    throw new CustomError('Bad Request', HttpStatusCode.BadRequest);
};
