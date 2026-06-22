import { memo, useCallback, type FC, type ChangeEvent } from 'react';
import { TaskStatuses, type TaskStatus, type TaskType } from '../../models/task';
import EditableSpan from '../UI/EditableSpan/EditableSpan';
import { Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type TaskProps = {
  task: TaskType,
  changeTaskTitle: (todoId: string, id: string, title: string) => void,
  changeTaskStatus: (todoId: string, id: string, status: TaskStatus) => void,
  removeTask: (todoId: string, id: string) => void,
};

const Task: FC<TaskProps> = memo(({
  task,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
}) => {
  const { id, todoListId, title, status } = task;

  const onChangeTaskTitle = useCallback((title: string) => {
    changeTaskTitle(todoListId, id, title);
  }, [changeTaskTitle, todoListId, id]);

  const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? TaskStatuses.Completed : TaskStatuses.New;
    changeTaskStatus(todoListId, id, newStatus);
  };

  return (
    <div className={status === TaskStatuses.Completed ? 'is-done' : undefined}>
      <Checkbox
        color="primary"
        checked={status === TaskStatuses.Completed}
        onChange={onChangeTaskStatus}
      />
      <EditableSpan text={title} onChangeText={onChangeTaskTitle} />
      <IconButton onClick={() => removeTask(todoListId, id)}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
