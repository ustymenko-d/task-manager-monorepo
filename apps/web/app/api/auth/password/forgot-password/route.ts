import { NextRequest, NextResponse } from 'next/server';

import { Email } from '@/types/auth';
import { RecaptchaToken } from '@/types/common';
import { handleRequest } from '@/lib/axios';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<Email & RecaptchaToken>(
		'/auth/password/forgot-password',
		'post',
		body
	);
};
