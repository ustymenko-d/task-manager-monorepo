import { Task } from '@repo/shared/types';
import { createMockMethods } from 'test/utils/createMockMethods';

const defaultTask: Task = {
  id: 'task-id-1',
  title: 'Task title',
  completed: false,
  userId: 'user-id',
  description: 'Task description',
  folderId: 'folder-id',
  lastEdited: new Date(),
  startDate: new Date(),
  expiresDate: null,
  parentTaskId: null,
  subtasks: [],
} as const;

export const mockTask = (overrides: Partial<Task> = {}): Task => ({
  ...defaultTask,
  subtasks: overrides.subtasks ?? [],
  ...overrides,
});

export const mockSubtask = (overrides: Partial<Task> = {}): Task => ({
  ...defaultTask,
  id: 'task-id-2',
  title: 'Subtask title',
  completed: true,
  parentTaskId: 'task-id-1',
  subtasks: [],
  ...overrides,
});

// Service
export const mockTasksService = () =>
  createMockMethods([
    'createTask',
    'getTasks',
    'editTask',
    'toggleStatus',
    'deleteTask',
  ] as const);

export type TasksServiceMock = ReturnType<typeof mockTasksService>;

// Gateway
export const mockTasksGateway = () =>
  createMockMethods([
    'emitTaskCreated',
    'emitTaskUpdated',
    'emitTaskDeleted',
    'emitTaskToggleStatus',
  ] as const);

export type TasksGatewayMock = ReturnType<typeof mockTasksGateway>;
