import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { Credentials } from '@/types/auth';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();
  return handleRequest<Credentials>('/auth/login', 'post', body);
};
