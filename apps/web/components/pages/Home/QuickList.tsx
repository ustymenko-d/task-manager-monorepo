'use client';

import { Plus } from 'lucide-react';

import TasksInfiniteScroll from '@/components/Tasks/TasksInfiniteScroll';
import { TASK_FETCH_LIMIT } from '@/const';
import useBreakpoints from '@/hooks/useBreakpoints';
import useAppStore from '@/store/store';

import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

const QuickList = () => {
	const { widthIndex } = useBreakpoints({ width: [640] });

	const openTaskEditor = useAppStore((s) => s.openTaskEditor);

	return (
		<div>
			<div className='flex flex-wrap items-center justify-between gap-4'>
				<h2 className='text-xl font-semibold'>Quick list</h2>

				<Button onClick={() => openTaskEditor('create', null)}>
					<Plus />
					<span className='text-sm sm:text-base'>
						{widthIndex ? 'Add task' : 'Add'}
					</span>
				</Button>
			</div>

			<Separator className='my-2' />

			<TasksInfiniteScroll
				type='quickList'
				fetchParams={{ limit: TASK_FETCH_LIMIT }}
				id='quick-list'
				className='max-h-96 overflow-auto rounded-xl border p-4 shadow-sm duration-300 sm:p-6'
			/>
		</div>
	);
};

export default QuickList;
