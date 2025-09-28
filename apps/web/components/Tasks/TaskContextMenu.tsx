import { useState } from 'react';
import { PropsWithChildren } from 'react';

import DeleteDialog from '@/components/DeleteDialog';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import useActions from '@/hooks/tasks/useActions';
import useAppStore from '@/store/store';
import { Task } from '@repo/shared/types';
import { ResponseState } from '@/types/common';

interface Props extends PropsWithChildren {
	task: Task;
	inTable?: boolean;
}

const TaskContextMenu = ({ task, children, inTable = false }: Props) => {
	const openTaskEditor = useAppStore((s) => s.openTaskEditor);
	const openTaskDialog = useAppStore((s) => s.openTaskDialog);

	const [openAlert, setOpenAlert] = useState(false);
	const [status, setStatus] = useState<ResponseState>('default');

	const { handleTaskAction: chengeTaskStatus } = useActions(
		'changeStatus',
		task
	);

	const { handleTaskAction: deleteTask } = useActions('delete', task);

	const handleOpenDetails = () => openTaskDialog(task);
	const openDeleteDialog = () => setTimeout(() => setOpenAlert(true), 0);

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger onClick={handleOpenDetails} asChild>
					{inTable ? (
						children
					) : (
						<div className='cursor-pointer'>{children}</div>
					)}
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onSelect={() => setTimeout(() => openTaskEditor('edit', task), 0)}>
						Edit task
					</ContextMenuItem>
					<ContextMenuItem
						onSelect={() =>
							setTimeout(() => openTaskEditor('create', task), 0)
						}>
						Add Subtask
					</ContextMenuItem>
					<ContextMenuItem
						onClick={() => chengeTaskStatus(setStatus)}
						disabled={status === 'pending'}>
						Toggle status
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem
						onSelect={openDeleteDialog}
						disabled={status === 'pending'}>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>

			<DeleteDialog
				handleDelete={() => deleteTask(setStatus)}
				loading={status === 'pending'}
				deleteTarget='task'
				open={openAlert}
				onOpenChange={setOpenAlert}
			/>
		</>
	);
};

export default TaskContextMenu;
