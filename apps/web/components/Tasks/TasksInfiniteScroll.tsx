'use client';

import { HTMLAttributes } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import TaskContextMenu from '@/components/Tasks/TaskContextMenu';
import useInfiniteFetch from '@/hooks/tasks/useInfiniteFetch';

import DraggableItem from '../pages/Folders/components/DraggableItem';
import TaskCard from './TaskCard/TaskCard';
import { GetTasksRequest } from '@/types/tasks';
import { Task } from '@repo/shared/types';
import Loader from '../Loader';

interface Props extends HTMLAttributes<HTMLDivElement> {
	fetchParams: Omit<GetTasksRequest, 'page'>;
	type: 'folder' | 'quickList';
}

const TasksInfiniteScroll = ({ id, className, fetchParams, type }: Props) => {
	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteFetch(fetchParams);

	const tasks = data?.pages.flatMap((page) => page.tasks) ?? [];

	const renderTaskItem = (task: Task) => (
		<TaskContextMenu key={task.id} task={task}>
			{type === 'folder' ? (
				<DraggableItem task={task} />
			) : (
				<TaskCard task={task} withCheckbox />
			)}
		</TaskContextMenu>
	);

	return (
		<div id={id} className={className}>
			{isLoading && (
				<Loader className='flex items-center justify-center px-6 py-4' />
			)}

			{!isLoading && tasks.length === 0 && (
				<p className='px-6 py-4 text-center text-muted-foreground'>
					Does not have any tasks yet
				</p>
			)}

			{tasks.length > 0 && (
				<InfiniteScroll
					dataLength={tasks.length}
					next={fetchNextPage}
					hasMore={!!hasNextPage}
					scrollableTarget={id}
					loader={null}
					endMessage={
						<p className='mt-4 text-center text-muted-foreground'>
							No more tasks
						</p>
					}>
					<ul className='space-y-2'>{tasks.map(renderTaskItem)}</ul>
					{isFetchingNextPage && <Loader className='justify-center py-2' />}
				</InfiniteScroll>
			)}
		</div>
	);
};

export default TasksInfiniteScroll;
