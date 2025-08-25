import { useDraggable } from '@dnd-kit/core';

import TaskCard from '@/components/Tasks/TaskCard/TaskCard';
import { Task } from '@repo/shared/types';

const DraggableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const isDragging = !!transform;

  return (
    <TaskCard
      task={task}
      dragProps={{ attributes, listeners, setNodeRef, isDragging }}
    />
  );
};

export default DraggableItem;
