import axios from 'axios';

export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
};

export type ResponseType<D = {}> = {
  data: D,
  resultCode: number,
  messages: Array<string>,
  fieldsErrors: Array<string>,
};

const requestSettings = {
  withCredentials: true,
  headers: {
    'API-KEY': '07a6853a-00ae-46be-89bd-7635822fedbc',
  },
};

const baseInstance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...requestSettings,
});

export const todoListsApi = {
  getTodolists() {
    return baseInstance
      .get<Array<TodoListType>>('todo-lists')
      .then(response => {
        console.log('Data log - fetch todo lists data', response);
        return response.data;
      });;
  },
  createTodolist(title: string) {
    const payload = { title };

    return baseInstance
      .post<ResponseType<{ itet: TodoListType }>>('todo-lists', payload)
      .then(response => {
        console.log('Data log - create todo list', response);
        return response.data;
      });;
  },
  deleteTodolist(id: string) {
    return baseInstance
      .delete<ResponseType>(`todo-lists/${id}`)
      .then(response => {
        console.log('Data log - remove todo list', response);
        return response.data;
      });
  },
  updateTodolistTitle(id: string, title: string) {
    const payload = { title };

    return baseInstance
      .put<ResponseType>(`todo-lists/${id}`, payload)
      .then(response => {
        console.log('Data log - update todo list title', response);
        return response.data;
      });
  },
};
