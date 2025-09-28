import { Pagination, ResponseStatus } from './common';

export interface Task {
	id: string;
	userId: string;
	title: string;
	lastEdited: Date;
	description?: string | null;
	completed?: boolean;
	parentTaskId?: string | null;
	startDate?: Date | null;
	expiresDate?: Date | null;
	folderId?: string | null;
	subtasks?: Task[];
}

export interface TaskResponse extends ResponseStatus {
	task: Task;
}

export interface GetTasksRequest {
	userId: string;
	title?: string;
	taskId?: string;
	completed?: boolean;
	topLayerTasks?: boolean;
	folderId?: string | null;
	page: number;
	limit: number;
}

export interface GetTasksResponse extends Pagination {
	tasks: Task[];
}
