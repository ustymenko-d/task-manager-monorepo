import { GetTasksRequestDto, TaskDto } from '@repo/api/dto/index';
import { Pagination, ResponseStatus } from './common';

export interface Task extends TaskDto {
  lastEdited: Date;
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
