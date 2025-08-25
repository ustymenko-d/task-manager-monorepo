import TasksValidation from '@/schemas/tasks';
import { GetTasksResponse } from '@repo/shared/types';
import { InfiniteData } from '@tanstack/react-query';
import z from 'zod';

export type TaskAction = 'create' | 'edit' | 'changeStatus' | 'delete';

export type TaskBase = z.infer<typeof TasksValidation.taskBase>;
export type TaskPayload = z.infer<typeof TasksValidation.task>;
export type GetTasksRequest = z.infer<typeof TasksValidation.getTasksRequest>;
export type TasksInfiniteData = InfiniteData<GetTasksResponse>;
