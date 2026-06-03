import { useEffect, useState } from 'react';
import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '07a6853a-00ae-46be-89bd-7635822fedbc',
  },
};

export default {
  title: 'TodoList/API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    axios
      .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then(response => {
        setState(response.data);
        console.log('Data log - fetch todo lists data', response);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const payload = { title: 'New ToDo' };

    axios
      .post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings)
      .then(response => {
        setState(response.data);
        console.log('Data log - create todo list', response);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = '';

    axios
      .delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
      .then(response => {
        setState(response.data);
        console.log('Data log - remove todo list', response);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todoListId = '';
    const payload = { title: 'Updated ToDo title' };

    axios
      .put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, payload, settings)
      .then(response => {
        setState(response.data);
        console.log('Data log - update todo list title', response);
      });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
