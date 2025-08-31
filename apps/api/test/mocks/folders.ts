import { Folder } from '@repo/shared/types';
import { createMockMethods } from 'test/utils/createMockMethods';

export const mockFolder = (overrides: Partial<Folder> = {}): Folder => ({
  id: 'folder-id',
  name: 'Folder name',
  userId: 'user-id',
  ...overrides,
});

export const mockFoldersService = () =>
  createMockMethods([
    'createFolder',
    'getFolders',
    'renameFolder',
    'deleteFolder',
  ] as const);

export type FoldersServiceMock = ReturnType<typeof mockFoldersService>;

export const mockFoldersGateway = () =>
  createMockMethods([
    'emitFolderCreated',
    'emitFolderRenamed',
    'emitFolderDeleted',
  ] as const);

export type FoldersGatewayMock = ReturnType<typeof mockFoldersGateway>;
