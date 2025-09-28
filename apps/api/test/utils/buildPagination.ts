import { Prisma } from '@prisma/client';
import { GetTasksRequest } from '@repo/shared/types';
import { mockPrisma } from 'test/mocks/prisma';

type Tables = 'task' | 'folder';

interface WhereInputMap {
	task: Prisma.TaskWhereInput;
	folder: Prisma.FolderWhereInput;
}

export const buildPagination = <T extends Tables>(
	table: T,
	req: GetTasksRequest,
	where: WhereInputMap[T]
) => [
	mockPrisma[table].findMany({
		where,
		skip: (req.page - 1) * req.limit,
		take: req.limit,
	}),
	mockPrisma[table].count({ where }),
];
