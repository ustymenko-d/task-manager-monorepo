import { RecaptchaToken } from '@/types/common';
import { ApiAxios, handleApiRequest } from './Axios';
import { GetTasksRequest, TaskBase, TaskPayload } from '@/types/tasks';
import { GetTasksResponse, Task, TaskResponse } from '@repo/shared/types';

const TASKS_API_URL = '/tasks';

const TasksAPI = {
	createTask: (payload: TaskBase & RecaptchaToken) =>
		handleApiRequest<TaskResponse>(() =>
			ApiAxios.post(`${TASKS_API_URL}/create`, payload)
		),

	getTasks: (payload: GetTasksRequest, config = {}) =>
		handleApiRequest<GetTasksResponse>(() =>
			ApiAxios.post(`${TASKS_API_URL}/get`, payload, config)
		),

	editTask: (payload: TaskPayload) =>
		handleApiRequest<TaskResponse>(() =>
			ApiAxios.put(`${TASKS_API_URL}`, payload)
		),

	toggleStatus: (payload: Pick<Task, 'id'>) =>
		handleApiRequest<TaskResponse>(() =>
			ApiAxios.patch(`${TASKS_API_URL}`, payload)
		),

	deleteTask: (payload: Pick<Task, 'id'>) =>
		handleApiRequest<TaskResponse>(() =>
			ApiAxios.delete(`${TASKS_API_URL}`, { data: payload })
		),
};

export default TasksAPI;
