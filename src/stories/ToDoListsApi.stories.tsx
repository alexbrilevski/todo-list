import { useEffect, useState } from 'react';
import { todoListsApi } from '../api/todoListsApi';

export default {
  title: 'TodoList/API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListsApi.getTodolists().then(responseData => {
      setState(responseData);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const title = 'New ToDo';
    todoListsApi.createTodolist(title).then(responseData => {
      setState(responseData);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = '9355ea23-d4dc-4fbe-9dfd-b565e8aa2b77';

    todoListsApi.deleteTodolist(todoListId).then(responseData => {
      setState(responseData);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = '65b4c6af-a80a-4cf1-9d40-4f5b4492d8b4';
    const title = 'Updated ToDo title';

    todoListsApi.updateTodolistTitle(todoListId, title).then(responseData => {
      setState(responseData);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
