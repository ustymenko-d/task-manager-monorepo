'use client';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// import {
//   IGetTasksResponse,
//   TasksInfiniteData,
//   TTaskPayload,
// } from '@/types/tasks';
import getTasksKey from '@/utils/getTasksKey';

import useActions from './useActions';
import { GetTasksResponse, Task } from '@repo/shared/types';
import { ResponseState } from '@/types/common';
import { TaskPayload, TasksInfiniteData } from '@/types/tasks';

const useMove = (setLoading: (loading: ResponseState) => void) => {
  const queryClient = useQueryClient();
  const { handleTaskAction } = useActions('edit');

  const moveTask = async (task: Task, newFolderId: string) => {
    const oldFolderId = task.folderId;
    const updatedTask: Task = { ...task, folderId: newFolderId };

    if (!oldFolderId) {
      console.error('Old folder id is undefined');
      return;
    }

    queryClient.setQueriesData<TasksInfiniteData>(
      { queryKey: getTasksKey(oldFolderId) },
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: GetTasksResponse) => ({
            ...page,
            tasks: page.tasks.filter((t) => t.id !== task.id),
            total: page.total - 1,
            pages: Math.ceil((page.total - 1) / page.limit),
          })),
        };
      },
    );

    queryClient.setQueriesData<TasksInfiniteData>(
      { queryKey: getTasksKey(newFolderId) },
      (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: GetTasksResponse, index: number) => {
            if (index === 0) {
              return {
                ...page,
                tasks: [updatedTask, ...page.tasks],
                total: page.total + 1,
                pages: Math.ceil((page.total + 1) / page.limit),
              };
            }

            return page;
          }),
        };
      },
    );

    try {
      await handleTaskAction(setLoading, createPayload(task, newFolderId));
    } catch (error) {
      toast.error('Failed to move the task. Data will be reloaded.');
      console.error('Task move failed:', error);

      queryClient.invalidateQueries({
        queryKey: getTasksKey(oldFolderId),
      });
      queryClient.invalidateQueries({
        queryKey: getTasksKey(newFolderId),
      });
    }
  };

  return { moveTask };
};

const createPayload = (task: Task, newFolderId: string): TaskPayload => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subtasks, lastEdited, ...updatedTask } = {
    ...task,
    folderId: newFolderId,
  };

  return updatedTask;
};

export default useMove;
