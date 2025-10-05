import { NextRequest, NextResponse } from 'next/server';
import { RecaptchaToken } from '@/types/common';
import { handleRequest } from '@/lib/axios';

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<RecaptchaToken>('/auth/delete-account', 'delete', body);
};
