import { Pagination, ResponseStatus } from '../common/types';
import { TaskDto } from './dto/task.dto';
import { GetTasksRequestDto } from './dto/get-request.dto';

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
