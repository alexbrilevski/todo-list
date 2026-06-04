import { useEffect, useState } from 'react';
import { todoListsApi } from '../api/todoListsApi';

export default {
  title: 'TodoList/API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todoListsApi.getTodolists().then(response => {
      console.log('Data log - fetch todo lists data', response);
      setState(response.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const title = 'New ToDo';
    todoListsApi.createTodolist(title).then(response => {
      console.log('Data log - create todo list', response);
      setState(response.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = 'ea060447-2c86-4530-89f0-69df67ce91cf';

    todoListsApi.deleteTodolist(todoListId).then(response => {
      console.log('Data log - remove todo list', response);
      setState(response.data);
    });;
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = '641be09f-06b3-49d0-86d4-cb160726ed88';
    const title = 'Updated ToDo title';

    todoListsApi.updateTodolistTitle(todoListId, title).then(response => {
      console.log('Data log - update todo list title', response);
      setState(response.data);
    });;
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
