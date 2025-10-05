import { handleRequest } from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
	const searchParams = request.nextUrl.searchParams.toString();
	return handleRequest(`/auth/email-verification?${searchParams}`, 'get');
};
