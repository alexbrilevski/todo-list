import { useCallback, useEffect, type FC } from 'react';
import AppHeader from './components/AppHeader';
import AddItemForm from './components/UI/AddItemForm/AddItemForm';
import ToDoList from './components/ToDoList';
import { Container, Grid, Paper } from '@mui/material';
import {
  addTodoListTC,
  changeTodoListFilterAC,
  changeTodoListTitleTC,
  fetchTodoLists,
  removeTodoListTC,
} from './store/todoListsReducer';
import {
  addTaskTC,
  updateTaskTC,
  deleteTaskTC,
  type TasksStateType,
} from './store/tasksReducer';
import { useAppDispatch, useAppSelector } from './store/store';
import type { TodoListFilterValues, TodoListDomainType } from './models/todo';
import type { TaskStatus } from './models/task';

type AppProps = {
  isDemo?: boolean,
};

const App: FC<AppProps> = ({ isDemo = false }) => {
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
    <div className="App">
      <AppHeader />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3} style={{ padding: "20px" }}>
          {todos.map(todo => {
            return (
              <Grid key={todo.id}>
                <Paper style={{ padding: "10px" }}>
                  <ToDoList
                    id={todo.id}
                    title={todo.title}
                    tasks={tasks[todo.id]}
                    filter={todo.filter}
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
      </Container>
    </div>
  );
}

export default App;
