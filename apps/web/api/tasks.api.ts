import { RecaptchaToken } from '@/types/common';
import { ApiAxios, handleApiRequest } from './Axios';
import { GetTasksRequest, TaskBase, TaskPayload } from '@/types/tasks';
import { GetTasksResponse, TaskResponse } from '@repo/api/types';

const TASKS_API_URL = '/tasks';

const TasksAPI = {
  createTask: (payload: TaskBase & RecaptchaToken) =>
    handleApiRequest<TaskResponse>(() =>
      ApiAxios.post(`${TASKS_API_URL}/create`, payload),
    ),

  getTasks: (payload: GetTasksRequest, config = {}) =>
    handleApiRequest<GetTasksResponse>(() =>
      ApiAxios.post(`${TASKS_API_URL}/get`, payload, config),
    ),

  editTask: (payload: TaskPayload) =>
    handleApiRequest<TaskResponse>(() =>
      ApiAxios.put(`${TASKS_API_URL}`, payload),
    ),

  toggleStatus: (taskId: string) =>
    handleApiRequest<TaskResponse>(() =>
      ApiAxios.patch(`${TASKS_API_URL}/${taskId}`),
    ),

  deleteTask: (taskId: string) =>
    handleApiRequest<TaskResponse>(() =>
      ApiAxios.delete(`${TASKS_API_URL}/${taskId}`),
    ),
};

export default TasksAPI;
