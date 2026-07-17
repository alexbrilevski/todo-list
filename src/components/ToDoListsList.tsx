import { useCallback, useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import type { TodoListDomainType, TodoListFilterValues } from "../models/todo";
import { 
  addTaskTC, 
  deleteTaskTC, 
  updateTaskTC, 
  type TasksStateType 
} from "../store/tasksReducer";
import type { TaskStatus } from "../models/task";
import { 
  addTodoListTC, 
  changeTodoListFilterAC, 
  changeTodoListTitleTC, 
  fetchTodoLists, 
  removeTodoListTC 
} from "../store/todoListsReducer";
import { Grid, Paper } from "@mui/material";
import ToDoList from "./ToDoList";
import AddItemForm from "./UI/AddItemForm/AddItemForm";

type ToDoListsListProps = {
  isDemo?: boolean,
};

const ToDoListsList: FC<ToDoListsListProps> = ({ isDemo = false }) => {
  const todos = useAppSelector<Array<TodoListDomainType>>(state => state.todos);
  const tasks = useAppSelector<TasksStateType>(state => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDemo) return;

    dispatch(fetchTodoLists());
  }, []);

  const addTodoList = useCallback((title: string) => {
    dispatch(addTodoListTC(title));
  }, []);

  const changeTodoListTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodoListTitleTC(id, title));
  }, []);

  const changeTodoListFilter = useCallback((id: string, filter: TodoListFilterValues) => {
    dispatch(changeTodoListFilterAC(id, filter));
  }, []);

  const removeTodoList = useCallback((id: string) => {
    dispatch(removeTodoListTC(id));
  }, []);

  const addTask = useCallback((todoId: string, title: string) => {
    dispatch(addTaskTC(todoId, title));
  }, []);

  const changeTaskTitle = useCallback((todoId: string, taskId: string, title: string) => {
    dispatch(updateTaskTC(todoId, taskId, { title }));
  }, []);

  const changeTaskStatus = useCallback((todoId: string, taskId: string, status: TaskStatus) => {
    dispatch(updateTaskTC(todoId, taskId, { status }));
  }, []);

  const removeTask = useCallback((todoId: string, taskId: string) => {
    dispatch(deleteTaskTC(todoId, taskId));
  }, []);

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        {todos.map(todo => {
          return (
            <Grid key={todo.id}>
              <Paper style={{ padding: "10px" }}>
                <ToDoList
                  todo={todo}
                  tasks={tasks[todo.id]}
                  changeTodoListTitle={changeTodoListTitle}
                  removeTodoList={removeTodoList}
                  addTask={addTask}
                  changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
                  removeTask={removeTask}
                  changeFilter={changeTodoListFilter}
                  isDemo={isDemo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ToDoListsList;
