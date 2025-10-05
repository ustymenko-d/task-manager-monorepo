'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import taskApi from '@/api/task';
import { GetTasksResponse } from '@repo/shared/types';
import { GetTasksRequest } from '@/types/tasks';

const useInfiniteFetch = (params: Omit<GetTasksRequest, 'page'>) =>
	useInfiniteQuery<GetTasksResponse, Error>({
		queryKey: ['tasks', params],
		queryFn: (context) =>
			taskApi.getTasks({
				...params,
				page: (context.pageParam as number) ?? 1,
			}),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = allPages.length + 1;
			return nextPage <= lastPage.pages ? nextPage : undefined;
		},
		staleTime: 1000 * 60 * 30,
		placeholderData: (prev) => prev,
		initialPageParam: 1,
	});

export default useInfiniteFetch;
