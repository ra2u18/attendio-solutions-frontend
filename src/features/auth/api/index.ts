import { HttpStatusCode } from 'axios';

import axios from '@/lib/axios';
import { CustomError } from '@/lib/errors';
import { LoginUserInput, LoginUserOutput } from '@/types/auth';

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
