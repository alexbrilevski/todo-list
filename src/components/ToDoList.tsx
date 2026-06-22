import { memo, useCallback, useEffect, type FC } from 'react';
import { TaskStatuses, type TaskStatus, type TaskType } from '../models/task';
import type { TodoListFilterValues } from '../models/todo';
import AddItemForm from './UI/AddItemForm/AddItemForm';
import Task from './Task/Task';
import EditableSpan from './UI/EditableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch } from '../store/store';
import { fetchTasks } from '../store/tasksReducer';

type ToDoListProps = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  filter: TodoListFilterValues,
  changeTodoListTitle: (id: string, title: string) => void
  removeTodoList: (id: string) => void,
  addTask: (id: string, title: string) => void,
  changeTaskTitle: (id: string, taskId: string, title: string) => void,
  changeTaskStatus: (id: string, taskId: string, status: TaskStatus) => void,
  removeTask: (id: string, taskId: string) => void,
  changeFilter: (id: string, filter: TodoListFilterValues) => void,
  isDemo?: boolean,
};

const ToDoList: FC<ToDoListProps> = memo(({
  id,
  title,
  tasks,
  filter,
  changeTodoListTitle,
  removeTodoList,
  addTask,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
  changeFilter,
  isDemo = false,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDemo) return;

    dispatch(fetchTasks(id));
  }, [id]);

  const onAddTask = useCallback((title: string) => {
    addTask(id, title);
  }, [addTask, id]);

  const onChangeTitle = useCallback((title: string) => {
    changeTodoListTitle(id, title);
  }, [changeTodoListTitle, id]);

  const onSelectFilter = (filter: TodoListFilterValues) => {
    changeFilter(id, filter);
  };

  let filteredTasks = tasks;

  if (filter === "active") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatuses.New);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter(task => task.status === TaskStatuses.Completed);
  }

  return (
    <div>
      <h3>
        <EditableSpan text={title} onChangeText={onChangeTitle} />
        <IconButton onClick={() => removeTodoList(id)}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} />
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filteredTasks.map(task =>
          <li key={task.id}>
            <Task
              todoId={id}
              task={task}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
              removeTask={removeTask}
            />
          </li>
        )}
      </ul>
      <div>
        <Button
          color="primary"
          variant={filter === "all" ? "outlined" : "text"}
          onClick={() => onSelectFilter('all')}>
          All
        </Button>
        <Button
          color="error"
          variant={filter === "active" ? "outlined" : "text"}
          onClick={() => onSelectFilter('active')}>
          Active
        </Button>
        <Button
          color="success"
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={() => onSelectFilter("completed")}>
          Completed
        </Button>
      </div>
    </div>
  );
});

export default ToDoList;
