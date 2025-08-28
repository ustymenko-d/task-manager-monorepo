import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { FolderName } from '@/types/folders';
import { RecaptchaToken } from '@/types/common';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();

  return handleRequest<FolderName & RecaptchaToken>('/folders', 'post', body, {
    headers: { 'x-socket-id': socketId },
  });
};

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const searchParams = request.nextUrl.searchParams.toString();
  return handleRequest(`/folders?${searchParams}`, 'get');
};

export const PATCH = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();

  return handleRequest('/folders', 'patch', body, {
    headers: { 'x-socket-id': socketId },
  });
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
  const socketId = request.headers.get('x-socket-id') || undefined;
  const body = await request.json();
  const { id } = body;

  return handleRequest(
    '/folders',
    'delete',
    { id },
    { headers: { 'x-socket-id': socketId } },
  );
};
