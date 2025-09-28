import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { Email } from '@/types/auth';
import { RecaptchaToken } from '@/types/common';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<Email & RecaptchaToken>(
		'/auth/password/forgot-password',
		'post',
		body
	);
};
