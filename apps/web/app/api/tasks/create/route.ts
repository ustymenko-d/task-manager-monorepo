import { NextRequest, NextResponse } from 'next/server';

import { RecaptchaToken } from '@/types/common';
import { TaskBase } from '@/types/tasks';
import { handleRequest } from '@/lib/axios';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const socketId = request.headers.get('x-socket-id') || undefined;
	const body = await request.json();

	return handleRequest<TaskBase & RecaptchaToken>(
		'/tasks/create',
		'post',
		body,
		{ headers: { 'x-socket-id': socketId } }
	);
};
