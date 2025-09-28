import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { mockTask, mockTasksService } from 'test/mocks/tasks';
import { CreateTaskDto, GetTasksRequestDto } from '@repo/api/dto';
import { mockPrisma } from 'test/mocks/prisma';
import { expectSuccess } from 'test/utils/expectSuccess';
import { GetTasksResponse, Task } from '@repo/shared/types';
import { expectThrows } from 'test/utils/expectThrows';
import { socketId } from 'test/mocks/sockets';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtUserMock } from 'test/mocks/auth';
import { configServiceMock } from 'test/mocks/common';
import { ConfigService } from '@nestjs/config';

describe('TasksController', () => {
	let controller: TasksController;
	let service: jest.Mocked<TasksService>;

	const newTaskDto: CreateTaskDto = { title: 'New Task' };
	const getRequest: GetTasksRequestDto = { page: 1, limit: 10 };
	const editedTask = mockTask({ title: 'Edited task' });
	const task = mockTask();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [
				{ provide: TasksService, useFactory: mockTasksService },
				{ provide: PrismaService, useValue: mockPrisma },
				{ provide: ConfigService, useValue: configServiceMock },
			],
		}).compile();

		controller = module.get(TasksController);
		service = module.get(TasksService);
	});

	describe('create()', () => {
		it('returns created task', async () => {
			service.createTask.mockResolvedValueOnce(task);

			const result = await controller.create(
				{ user: jwtUserMock },
				newTaskDto,
				socketId
			);

			expect(service.createTask).toHaveBeenCalledWith(
				{ ...newTaskDto, userId: jwtUserMock.userId },
				socketId
			);
			expect(result).toEqual(
				expectSuccess<Task>('Task created successfully.', task, 'task')
			);
		});

		it('throws when service fails', async () => {
			service.createTask.mockRejectedValueOnce(new Error('Error'));
			await expectThrows(() =>
				controller.create({ user: jwtUserMock }, newTaskDto, socketId)
			);
		});
	});

	describe('get()', () => {
		const response: GetTasksResponse = {
			tasks: [],
			page: getRequest.page,
			limit: getRequest.limit,
			total: 0,
			pages: 0,
		};

		it('returns paginated list', async () => {
			service.getTasks.mockResolvedValueOnce(response);

			const result = await controller.get({ user: jwtUserMock }, getRequest);

			expect(service.getTasks).toHaveBeenCalledWith({
				...getRequest,
				userId: jwtUserMock.userId,
			});
			expect(result).toEqual(response);
		});

		it('throws when service fails', async () => {
			service.getTasks.mockRejectedValueOnce(new Error('Error'));
			await expectThrows(() =>
				controller.get({ user: jwtUserMock }, getRequest)
			);
		});
	});

	describe('edit()', () => {
		it('returns updated task', async () => {
			service.editTask.mockResolvedValueOnce(editedTask);

			const result = await controller.edit(editedTask, socketId);

			expect(service.editTask).toHaveBeenCalledWith(editedTask, socketId);
			expect(result).toEqual(
				expectSuccess<Task>('Task edited successfully.', editedTask, 'task')
			);
		});

		it('throws when service fails', async () => {
			service.editTask.mockRejectedValueOnce(new Error('Error'));
			await expectThrows(() => controller.edit(editedTask, socketId));
		});
	});

	describe('toggleStatus()', () => {
		const toggledTask = mockTask({ ...task, completed: true });

		it('toggles and returns task', async () => {
			service.toggleStatus.mockResolvedValueOnce(toggledTask);

			const result = await controller.toggleStatus(
				{ id: toggledTask.id },
				socketId
			);

			expect(service.toggleStatus).toHaveBeenCalledWith(
				toggledTask.id,
				socketId
			);
			expect(result).toEqual(
				expectSuccess<Task>(
					'Task status changed successfully.',
					toggledTask,
					'task'
				)
			);
		});

		it('throws when service fails', async () => {
			service.toggleStatus.mockRejectedValueOnce(new Error('Error'));
			await expectThrows(() =>
				controller.toggleStatus({ id: toggledTask.id }, socketId)
			);
		});
	});

	describe('delete()', () => {
		it('deletes and returns task', async () => {
			service.deleteTask.mockResolvedValueOnce(task);

			const result = await controller.delete({ id: task.id }, socketId);

			expect(service.deleteTask).toHaveBeenCalledWith(task.id, socketId);
			expect(result).toEqual(
				expectSuccess<Task>('Task deleted successfully.', task, 'task')
			);
		});

		it('throws when service fails', async () => {
			service.deleteTask.mockRejectedValueOnce(new Error('Error'));
			await expectThrows(() => controller.delete({ id: task.id }, socketId));
		});
	});
});
