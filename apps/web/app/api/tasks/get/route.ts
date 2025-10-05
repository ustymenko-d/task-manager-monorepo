import { NextRequest, NextResponse } from 'next/server';

import { GetTasksRequest } from '@/types/tasks';
import { handleRequest } from '@/lib/axios';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<GetTasksRequest>('/tasks/get', 'post', body);
};
