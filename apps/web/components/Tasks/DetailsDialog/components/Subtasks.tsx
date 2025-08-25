'use client';

import useAppStore from '@/store/store';

import TaskCard from '../../TaskCard/TaskCard';
import { Task } from '@repo/shared/types';

const Subtasks = ({ subtasks }: { subtasks: Task[] }) => {
  const openTaskDialog = useAppStore((s) => s.openTaskDialog);

  return subtasks.map((task) => {
    const handleOpenDetails = () => openTaskDialog(task);

    return (
      <div key={task.id} onClick={handleOpenDetails} className="cursor-pointer">
        <TaskCard task={task} withCheckbox />
      </div>
    );
  });
};

export default Subtasks;
