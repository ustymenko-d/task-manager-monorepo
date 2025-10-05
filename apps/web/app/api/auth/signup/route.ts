import { NextRequest, NextResponse } from 'next/server';

import { Credentials } from '@/types/auth';
import { handleRequest } from '@/lib/axios';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<Credentials>('/auth/signup', 'post', body);
};
