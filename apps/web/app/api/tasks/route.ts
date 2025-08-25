import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { Task } from '@repo/shared/types';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
  const body = await request.json();
  const socketId = request.headers.get('x-socket-id') || undefined;

  return handleRequest<Task>('/tasks', 'put', body, {
    headers: {
      'x-socket-id': socketId,
    },
  });
};
