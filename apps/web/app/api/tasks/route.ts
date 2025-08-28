import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { Task } from '@repo/shared/types';

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();

  return handleRequest<Task>('/tasks', 'put', body, {
    headers: { 'x-socket-id': socketId },
  });
};

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();
  const { id } = body;

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  return handleRequest('/tasks', 'patch', body, {
    headers: { 'x-socket-id': socketId },
  });
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();
  const { id } = body;

  if (!id) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  return handleRequest('/tasks', 'delete', body, {
    headers: { 'x-socket-id': socketId },
  });
};
