import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { Password } from '@/types/auth';
import { RecaptchaToken } from '@/types/common';

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {
  const searchParams = request.nextUrl.searchParams.toString();
  const body = await request.json();

  return handleRequest<Password & RecaptchaToken>(
    `/auth/password/reset-password?${searchParams}`,
    'patch',
    body,
  );
};
