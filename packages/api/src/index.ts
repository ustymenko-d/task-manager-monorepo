import { CredentialsDto } from 'auth/dto/credentials-data.dto';
import { EmailDto } from 'auth/dto/email.dto';
import { PasswordDto } from 'auth/dto/password.dto';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksRequestDto } from 'tasks/dto/get-request.dto';
import { TaskIdDto } from 'tasks/dto/task-id.dto';
import { TaskDto } from 'tasks/dto/task.dto';

export const auth = {
  dto: {
    PasswordDto,
    EmailDto,
    CredentialsDto,
  },
};

export const tasks = {
  dto: {
    CreateTaskDto,
    TaskDto,
    TaskIdDto,
    GetTasksRequestDto,
  },
};
