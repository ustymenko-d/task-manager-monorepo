import { NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';

export const GET = async (): Promise<NextResponse> =>
  await handleRequest('/auth/cookies/clear-auth-cookies', 'get');
