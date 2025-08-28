import {
  Body,
  Controller,
  Delete,
  Headers,
  Logger,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { handleRequest } from 'src/common/utils/requestHandler';
import { TaskOwner } from './tasks.guard';
import { RecaptchaGuard } from 'src/common/recaptcha.guard';
import { StripRecaptchaInterceptor } from 'src/common/strip-recaptcha.interceptor';
import {
  GetTasksResponse,
  JwtUser,
  TaskResponse,
} from '@repo/shared/types/index';
import {
  CreateTaskDto,
  GetTasksRequestDto,
  TaskDto,
  TaskIdDto,
} from '@repo/api/dto/index';

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

  @Patch()
  @UseGuards(AuthGuard('jwt'), TaskOwner)
  async toggleStatus(
    @Body() { id }: TaskIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task status changed successfully.',
        task: await this.tasksService.toggleStatus(id, socketId),
      }),
      `Error while changing task status (ID: ${id}).`,
      this.logger,
    );
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), TaskOwner)
  async delete(
    @Body() { id }: TaskIdDto,
    @Headers('x-socket-id') socketId?: string,
  ): Promise<TaskResponse> {
    return handleRequest(
      async () => ({
        success: true,
        message: 'Task deleted successfully.',
        task: await this.tasksService.deleteTask(id, socketId),
      }),
      'Error while deleting a task.',
      this.logger,
    );
  }
}
