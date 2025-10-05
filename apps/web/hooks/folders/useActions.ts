'use client';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import folderApi from '@/api/folder';
import useAppStore from '@/store/store';

import { useWithRecaptcha } from '../useWithRecaptcha';
import { Folder } from '@repo/shared/types';
import { FolderName, FoldersAction } from '@/types/folders';
import { ResponseState } from '@/types/common';

const useActions = (action: FoldersAction, folder?: Folder) => {
	const queryClient = useQueryClient();
	const { withRecaptcha } = useWithRecaptcha('folder_action');

	const closeEditor = useAppStore((s) => s.closeFolderEditor);

	const performAction = async (payload?: FolderName | string) => {
		switch (action) {
			case 'create':
				return folderApi.createFolder(
					await withRecaptcha<FolderName>(payload as FolderName)
				);

			case 'rename':
				if (!folder) throw new Error('`folder` is required to rename');
				return folderApi.renameFolder({
					...(payload as FolderName),
					id: folder?.id,
				});

			case 'delete':
				if (!folder) throw new Error('`folder` is required to delete');
				return folderApi.deleteFolder({ id: folder?.id });

			default:
				throw new Error('Unknown action');
		}
	};

	const handleFolderAction = async (
		setLoadingState: (state: ResponseState) => void,
		payload?: FolderName
	) => {
		try {
			setLoadingState('pending');

			const { success, message } = await performAction(payload);

			if (!success) {
				setLoadingState('error');
				toast.error(message ?? 'Something went wrong');
				throw new Error(`[useFoldersActions] ${action} failed`);
			}

			setLoadingState('success');
			toast.success(message || 'Successfuly completed');

			queryClient.invalidateQueries({ queryKey: ['folders'] });

			if (['create', 'rename'].includes(action)) closeEditor();
		} catch (error) {
			console.error(`[useFoldersActions] ${action} folder error:`, error);
			throw error;
		}
	};

	return { handleFolderAction };
};

export default useActions;
