import FoldersValidation from '@/schemas/folders';
import { PaginationDto } from '@repo/api/dto/common';
import z from 'zod';

export type FoldersAction = 'create' | 'rename' | 'delete';

export type FolderName = z.infer<typeof FoldersValidation.folderName>;

export interface GetFoldersRequest extends PaginationDto {
  name?: string;
}
