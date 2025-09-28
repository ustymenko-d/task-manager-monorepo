import FoldersValidation from '@/schemas/folders';
import z from 'zod';

export type FoldersAction = 'create' | 'rename' | 'delete';

export type FolderName = z.infer<typeof FoldersValidation.folderName>;

export interface GetFoldersRequest {
	page: number;
	limit: number;
	name?: string;
}
