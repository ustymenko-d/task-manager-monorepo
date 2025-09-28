import { handleRequest } from '@/api/Axios';
import { GoogleAuthCode } from '@repo/shared/types';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body: GoogleAuthCode = await request.json();
	return handleRequest<GoogleAuthCode>(
		'/auth/google/verification',
		'post',
		body
	);
};
