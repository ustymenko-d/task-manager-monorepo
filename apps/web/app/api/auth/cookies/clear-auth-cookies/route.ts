import { handleRequest } from '@/lib/axios';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> =>
	await handleRequest('/auth/cookies/clear-auth-cookies', 'get');
