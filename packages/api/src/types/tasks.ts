import { TaskDto } from '../dto/tasks/task';
import { Pagination, ResponseStatus } from './common';
import { GetTasksRequestDto } from '../dto/tasks/get-request';

export interface Task extends TaskDto {
  subtasks?: Task[];
}

export interface TaskResponse extends ResponseStatus {
  task: Task;
}

export interface GetTasksRequest extends GetTasksRequestDto {
  userId: string;
}

export interface GetTasksResponse extends Pagination {
  tasks: Task[];
}
