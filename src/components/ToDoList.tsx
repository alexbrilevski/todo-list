import { memo, useCallback, type FC } from 'react';
import { TaskStatuses, type TaskStatus, type DomainTask } from '../models/task';
import type { TodoListDomainType, TodoListFilterValues } from '../models/todo';
import AddItemForm from './UI/AddItemForm/AddItemForm';
import Task from './Task/Task';
import EditableSpan from './UI/EditableSpan/EditableSpan';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

type ToDoListProps = {
  todo: TodoListDomainType,
  tasks: Array<DomainTask>,
  changeTodoListTitle: (id: string, title: string) => void
  removeTodoList: (id: string) => void,
  addTask: (id: string, title: string) => void,
  changeTaskTitle: (id: string, taskId: string, title: string) => void,
  changeTaskStatus: (id: string, taskId: string, status: TaskStatus) => void,
  removeTask: (id: string, taskId: string) => void,
  changeFilter: (id: string, filter: TodoListFilterValues) => void,
};

const ToDoList: FC<ToDoListProps> = memo(({
  todo,
  tasks,
  changeTodoListTitle,
  removeTodoList,
  addTask,
  changeTaskTitle,
  changeTaskStatus,
  removeTask,
  changeFilter,
}) => {
  const { id, title, filter, entityStatus } = todo;

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
        <EditableSpan
          text={title}
          onChangeText={onChangeTitle}
          disabled={entityStatus === "loading"}
        />
        <IconButton
          onClick={() => removeTodoList(id)}
          disabled={entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} disabled={entityStatus === "loading"} />
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filteredTasks.map(task =>
          <li key={task.id}>
            <Task
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
