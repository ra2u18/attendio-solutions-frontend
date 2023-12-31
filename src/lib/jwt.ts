import { HttpStatusCode } from 'axios';
import { jwtVerify, type JWTVerifyResult } from 'jose';

import { UserState } from '@/types/auth';

import { CustomError } from './errors';

export async function verifyAccessToken(token: string): Promise<UserState> {
  const secret = import.meta.env.VITE_JWT_ACCESS_TOKEN_SECRET;

  try {
    const { payload }: JWTVerifyResult = await jwtVerify(token, new TextEncoder().encode(secret));

    return payload as UserState;
  } catch (error) {
    throw new CustomError('Invalid access token', HttpStatusCode.Unauthorized);
  }
}
