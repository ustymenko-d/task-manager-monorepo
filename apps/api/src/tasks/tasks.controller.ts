import {
  Body,
  Controller,
  Delete,
  Headers,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { JwtUser } from '@repo/api/common/types';
import { CreateTaskDto } from '@repo/api/tasks/dto/create-task.dto';
import { GetTasksResponse, TaskResponse } from '@repo/api/tasks/types';
import { handleRequest } from 'src/common/utils/requestHandler';
import { GetTasksRequestDto } from '@repo/api/tasks/dto/get-request.dto';
import { TaskOwner } from './tasks.guard';
import { TaskDto } from '@repo/api/tasks/dto/task.dto';
import { TaskIdDto } from '@repo/api/tasks/dto/task-id.dto';
import { RecaptchaGuard } from 'src/common/recaptcha.guard';
import { StripRecaptchaInterceptor } from 'src/common/strip-recaptcha.interceptor';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @UseGuards(RecaptchaGuard, AuthGuard('jwt'))
  @UseInterceptors(StripRecaptchaInterceptor)
  async create(
    @Req() req: { user: JwtUser },
    @Body() body: CreateTaskDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task created successfully.',
        task: await this.tasksService.createTask(
          {
            ...body,
            userId: req.user.userId,
          },
          socketId,
        ),
      }),
      'Error while creating a task.',
      this.logger,
    );
  }

  @Post('get')
  @UseGuards(AuthGuard('jwt'))
  async get(
    @Req() req: { user: JwtUser },
    @Body() body: GetTasksRequestDto,
  ): Promise<GetTasksResponse> {
    return handleRequest(
      async () =>
        await this.tasksService.getTasks({
          ...body,
          userId: req.user.userId,
        }),
      'Error while fetching tasks.',
      this.logger,
    );
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), TaskOwner)
  async edit(
    @Body() body: TaskDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task edited successfully.',
        task: await this.tasksService.editTask(body, socketId),
      }),
      'Error while editing a task.',
      this.logger,
    );
  }

  @Patch(':taskId')
  @UseGuards(AuthGuard('jwt'), TaskOwner)
  async toggleStatus(
    @Param() { taskId }: TaskIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task status changed successfully.',
        task: await this.tasksService.toggleStatus(taskId, socketId),
      }),
      `Error while changing task status (ID: ${taskId}).`,
      this.logger,
    );
  }

  @Delete(':taskId')
  @UseGuards(AuthGuard('jwt'), TaskOwner)
  async delete(
    @Param() { taskId }: TaskIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task deleted successfully.',
        task: await this.tasksService.deleteTask(taskId, socketId),
      }),
      'Error while deleting a task.',
      this.logger,
    );
  }
}
