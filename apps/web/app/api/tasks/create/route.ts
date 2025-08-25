import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { RecaptchaToken } from '@/types/common';
import { TaskBase } from '@/types/tasks';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();
  const socketId = request.headers.get('x-socket-id') || undefined;

  return handleRequest<TaskBase & RecaptchaToken>(
    '/tasks/create',
    'post',
    body,
    {
      headers: {
        'x-socket-id': socketId,
      },
    },
  );
};
