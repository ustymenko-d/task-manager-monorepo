import { apiRoutesInstance, handleApiRouteRequest } from '@/lib/axios';
import { RecaptchaToken } from '@/types/common';
import { GetTasksRequest, TaskBase, TaskPayload } from '@/types/tasks';
import { GetTasksResponse, Task, TaskResponse } from '@repo/shared/types';

const TASKS_API_URL = '/tasks';

const taskAPI = {
	createTask: (payload: TaskBase & RecaptchaToken) =>
		handleApiRouteRequest<TaskResponse>(() =>
			apiRoutesInstance.post(`${TASKS_API_URL}/create`, payload)
		),

	getTasks: (payload: GetTasksRequest, config = {}) =>
		handleApiRouteRequest<GetTasksResponse>(() =>
			apiRoutesInstance.post(`${TASKS_API_URL}/get`, payload, config)
		),

	editTask: (payload: TaskPayload) =>
		handleApiRouteRequest<TaskResponse>(() =>
			apiRoutesInstance.put(`${TASKS_API_URL}`, payload)
		),

	toggleStatus: (payload: Pick<Task, 'id'>) =>
		handleApiRouteRequest<TaskResponse>(() =>
			apiRoutesInstance.patch(`${TASKS_API_URL}`, payload)
		),

	deleteTask: (payload: Pick<Task, 'id'>) =>
		handleApiRouteRequest<TaskResponse>(() =>
			apiRoutesInstance.delete(`${TASKS_API_URL}`, { data: payload })
		),
};

export default taskAPI;
