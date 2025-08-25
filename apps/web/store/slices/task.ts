import { EditorSettings } from '@/types/common';
import getDefaultEditorSettings from '@/utils/getDefaultEditorSettings';
import { Task } from '@repo/shared/types';

export interface TaskSlice {
  taskInMotion: Task | null;
  setTaskInMotion: (task: Task | null) => void;

  taskDialogSettings: {
    open: boolean;
    task: Task | null;
  };
  updateDialogTask: (task: Task) => void;
  openTaskDialog: (task: Task | null) => void;
  closeTaskDialog: () => void;

  taskEditorSettings: EditorSettings<Task>;
  openTaskEditor: (mode: 'edit' | 'create', target: Task | null) => void;
  closeTaskEditor: () => void;

  searchTerm: string;
  setSearchTerm: (newValue: string) => void;
}

const taskEditorSettings = getDefaultEditorSettings<Task>();

const createTaskSlice = (
  set: (
    partial: Partial<TaskSlice> | ((state: TaskSlice) => Partial<TaskSlice>),
  ) => void,
): TaskSlice => ({
  taskInMotion: null,
  setTaskInMotion: (taskInMotion) => set({ taskInMotion }),

  taskDialogSettings: { open: false, task: null },
  updateDialogTask: (task) =>
    set((state) => ({
      taskDialogSettings: {
        ...state.taskDialogSettings,
        task: task,
      },
    })),
  openTaskDialog: (task) => set({ taskDialogSettings: { open: true, task } }),
  closeTaskDialog: () =>
    set({ taskDialogSettings: { open: false, task: null } }),

  taskEditorSettings,
  openTaskEditor: (mode, target) =>
    set({ taskEditorSettings: { open: true, mode, target } }),
  closeTaskEditor: () =>
    set((state) => ({
      taskEditorSettings: {
        ...state.taskEditorSettings,
        open: false,
        target: null,
      },
    })),

  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
});

export default createTaskSlice;
