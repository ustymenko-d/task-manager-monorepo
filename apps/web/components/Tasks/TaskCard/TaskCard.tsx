'use client';

import { CircleCheck, Loader } from 'lucide-react';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import useBreakpoints from '@/hooks/useBreakpoints';
import { cn } from '@/lib/utils';
import { formatValue } from '@/utils/formatting';

import CardCheckbox from './components/CardCheckbox';
import DragHandle, { IDragProps } from './components/DragHandle';
import { Task } from '@repo/shared/types';

interface Props {
	task: Task;
	withCheckbox?: boolean;
	dragProps?: IDragProps;
	taskInMotion?: string | null;
}

const TaskCard = ({
	task,
	withCheckbox = false,
	dragProps,
	taskInMotion,
}: Props) => {
	const { widthIndex } = useBreakpoints({ width: [640] });

	const { id, title, completed } = task;

	const statusText = completed ? 'Completed' : 'In\u00A0Progress';

	const statusIcon = completed ? (
		<CircleCheck
			className='shrink-0 text-green-500 dark:text-green-400'
			size={16}
			strokeWidth={1}
		/>
	) : (
		<Loader
			className='shrink-0 text-muted-foreground'
			size={16}
			strokeWidth={1}
		/>
	);

	return (
		<div
			ref={dragProps?.setNodeRef}
			{...(dragProps?.attributes || {})}
			className={cn(
				'flex items-stretch break-words rounded-md border bg-white shadow-sm transition-opacity hover:bg-accent dark:bg-black',
				dragProps?.isDragging && 'opacity-50'
			)}>
			{(dragProps || taskInMotion) && (
				<DragHandle id={id} dragProps={dragProps} taskInMotion={taskInMotion} />
			)}

			{withCheckbox && <CardCheckbox task={task} />}

			<div
				className='grow break-words border-r p-2'
				style={{ wordBreak: 'break-word' }}>
				{formatValue(title)}
			</div>

			<div className='flex items-center gap-2 p-2 sm:min-w-28'>
				{widthIndex > 0 ? (
					<>
						{statusIcon}
						{statusText}
					</>
				) : (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>{statusIcon}</TooltipTrigger>
							<TooltipContent>{statusText}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</div>
		</div>
	);
};

export default TaskCard;
