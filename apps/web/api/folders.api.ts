import { RecaptchaToken } from '@/types/common';
import { ApiAxios, handleApiRequest } from './Axios';
import { FolderName, GetFoldersRequest } from '@/types/folders';
import { FolderResponse, GetFoldersResponse } from '@repo/api/types';

const FOLDERS_API_URL = '/folders';

const buildQueryParams = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

const FoldersAPI = {
  createFolder: (payload: FolderName & RecaptchaToken) =>
    handleApiRequest<FolderResponse>(() =>
      ApiAxios.post(`${FOLDERS_API_URL}`, payload),
    ),

  getFolders: (searchParams: GetFoldersRequest) => {
    const query = buildQueryParams(
      searchParams as unknown as Record<string, string>,
    );

    return handleApiRequest<GetFoldersResponse>(() =>
      ApiAxios.get(`${FOLDERS_API_URL}?${query}`),
    );
  },

  renameFolder: (id: string, payload: FolderName) =>
    handleApiRequest<FolderResponse>(() =>
      ApiAxios.patch(`${FOLDERS_API_URL}/${id}`, payload),
    ),

  deleteFolder: (id: string) =>
    handleApiRequest<FolderResponse>(() =>
      ApiAxios.delete(`${FOLDERS_API_URL}/${id}`),
    ),
};

export default FoldersAPI;
