import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from './base.gateway';
import { ConfigService } from '@nestjs/config';
import { Task } from '@repo/api/tasks/types';

@Injectable()
@WebSocketGateway()
export class TasksGateway extends BaseGateway {
  constructor(configService: ConfigService) {
    super(configService);
  }

  emitTaskCreated(task: Task, initiatorSocketId?: string) {
    this.emitEntityEvent<Task>('task', 'created', task, initiatorSocketId);
  }

  emitTaskUpdated(task: Task, initiatorSocketId?: string) {
    this.emitEntityEvent<Task>('task', 'updated', task, initiatorSocketId);
  }

  emitTaskToggleStatus(task: Task, initiatorSocketId?: string) {
    this.emitEntityEvent<Task>('task', 'toggleStatus', task, initiatorSocketId);
  }

  emitTaskDeleted(task: Task, initiatorSocketId?: string) {
    this.emitEntityEvent<Task>('task', 'deleted', task, initiatorSocketId);
  }
}
