'use client';

import useAppStore from '@/store/store';

import TaskCard from '../../TaskCard/TaskCard';
import { Task } from '@repo/shared/types';

const Subtasks = ({ subtasks }: { subtasks: Task[] }) => {
	const openTaskDialog = useAppStore((s) => s.openTaskDialog);

	return subtasks.map((task) => (
		<div
			key={task.id}
			onClick={() => openTaskDialog(task)}
			className='cursor-pointer'>
			<TaskCard task={task} withCheckbox />
		</div>
	));
};

export default Subtasks;
