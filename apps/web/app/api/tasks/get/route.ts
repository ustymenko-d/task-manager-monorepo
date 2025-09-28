import { NextRequest, NextResponse } from 'next/server';

import { handleRequest } from '@/api/Axios';
import { GetTasksRequest } from '@/types/tasks';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
	const body = await request.json();
	return handleRequest<GetTasksRequest>('/tasks/get', 'post', body);
};
