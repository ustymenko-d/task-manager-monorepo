import { apiRoutesInstance, handleApiRouteRequest } from '@/lib/axios';
import { RecaptchaToken } from '@/types/common';
import { FolderName, GetFoldersRequest } from '@/types/folders';
import { Folder, FolderResponse, GetFoldersResponse } from '@repo/shared/types';

const FOLDERS_API_URL = '/folders';

const buildQueryParams = (params: Record<string, string>) =>
	new URLSearchParams(params).toString();

const folderAPI = {
	createFolder: (payload: FolderName & RecaptchaToken) =>
		handleApiRouteRequest<FolderResponse>(() =>
			apiRoutesInstance.post(`${FOLDERS_API_URL}`, payload)
		),

	getFolders: (searchParams: GetFoldersRequest) => {
		const query = buildQueryParams(
			searchParams as unknown as Record<string, string>
		);

		return handleApiRouteRequest<GetFoldersResponse>(() =>
			apiRoutesInstance.get(`${FOLDERS_API_URL}?${query}`)
		);
	},

	renameFolder: (payload: Pick<Folder, 'id' | 'name'>) =>
		handleApiRouteRequest<FolderResponse>(() =>
			apiRoutesInstance.patch(`${FOLDERS_API_URL}`, payload)
		),

	deleteFolder: (payload: Pick<Folder, 'id'>) =>
		handleApiRouteRequest<FolderResponse>(() =>
			apiRoutesInstance.delete(`${FOLDERS_API_URL}`, { data: payload })
		),
};

export default folderAPI;
