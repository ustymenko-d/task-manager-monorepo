import { IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;
}
