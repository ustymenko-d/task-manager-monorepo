import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { RecaptchaToken } from '@/types/common';

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();
  return handleRequest<RecaptchaToken>('/auth/delete-account', 'delete', body);
};
