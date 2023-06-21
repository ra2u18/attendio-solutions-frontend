import { HttpStatusCode } from 'axios';

import axios from '@/lib/axios';
import { CustomError } from '@/lib/errors';
import {
  AppRegisterInput,
  AppRegisterOutput,
  LoginUserInput,
  LoginUserOutput,
  VerifyOTPInput,
} from '@/types/auth';

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
