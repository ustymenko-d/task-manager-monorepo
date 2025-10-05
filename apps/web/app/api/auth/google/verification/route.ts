import { handleRequest } from '@/lib/axios';
import { GoogleAuthPayload } from '@repo/shared/types';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body: GoogleAuthPayload = await request.json();
	return handleRequest<GoogleAuthPayload>(
		'/auth/google/verification',
		'post',
		body
	);
};
