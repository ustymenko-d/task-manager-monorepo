import { IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task';

export class TaskDto extends CreateTaskDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;
}
