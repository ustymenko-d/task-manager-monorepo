import { Pagination, ResponseStatus } from './common';

export interface CreateFolderPayload {
  name: string;
  userId: string;
}

export interface Folder extends CreateFolderPayload {
  id: string;
}

export interface GetFoldersPayload
  extends Omit<Pagination, 'pages' | 'total'>,
    CreateFolderPayload {}

export interface FolderResponse extends ResponseStatus {
  folder: Folder;
}

export interface GetFoldersResponse extends Pagination {
  folders: Folder[];
}
