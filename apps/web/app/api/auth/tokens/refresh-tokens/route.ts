import { handleRequest } from '@/lib/axios';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> =>
	handleRequest('/auth/tokens/refresh-tokens', 'get');
