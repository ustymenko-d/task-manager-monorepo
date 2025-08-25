import { EditorSettings } from '@/types/common';
import getDefaultEditorSettings from '@/utils/getDefaultEditorSettings';
import { Folder } from '@repo/api/types';

export interface FoldersSlice {
  folderEditorSettings: EditorSettings<Folder>;

  openFolderEditor: (
    mode: 'edit' | 'create',
    selectedFolder: Folder | null,
  ) => void;

  closeFolderEditor: () => void;

  isFetching: boolean;
  setIsFetching: (newValue: boolean) => void;
}

const folderEditorSettings = getDefaultEditorSettings<Folder>();

const createFoldersSlice = (
  set: (
    partial:
      | Partial<FoldersSlice>
      | ((state: FoldersSlice) => Partial<FoldersSlice>),
  ) => void,
): FoldersSlice => ({
  folderEditorSettings,

  openFolderEditor: (mode, target) =>
    set({ folderEditorSettings: { open: true, mode, target } }),

  closeFolderEditor: () =>
    set((state) => ({
      folderEditorSettings: {
        ...state.folderEditorSettings,
        open: false,
        target: null,
      },
    })),

  isFetching: false,
  setIsFetching: (isFetching) => set({ isFetching }),
});

export default createFoldersSlice;
