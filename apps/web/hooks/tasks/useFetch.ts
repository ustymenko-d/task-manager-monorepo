'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import TasksAPI from '@/api/tasks.api';
import useIsStartPage from '@/utils/isStartPage';
import { GetTasksResponse } from '@repo/shared/types';
import { GetTasksRequest } from '@/types/tasks';

const useFetch = (params: GetTasksRequest) => {
  const pathname = usePathname();

  return useQuery<
    GetTasksResponse,
    Error,
    GetTasksResponse,
    [string, GetTasksRequest]
  >({
    queryKey: ['tasks', params],
    queryFn: () => TasksAPI.getTasks(params),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 30,
    retry: false,
    enabled: !useIsStartPage(pathname),
  });
};

export default useFetch;
