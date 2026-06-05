import axios from 'axios';

export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
};

export type ResponseData<D = {}> = {
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
      .get<Array<TodoListType>>('todo-lists');
  },
  createTodolist(title: string) {
    const payload = { title };

    return baseInstance
      .post<ResponseData<{ itet: TodoListType }>>('todo-lists', payload);
  },
  deleteTodolist(id: string) {
    return baseInstance
      .delete<ResponseData>(`todo-lists/${id}`);
  },
  updateTodolistTitle(id: string, title: string) {
    const payload = { title };

    return baseInstance
      .put<ResponseData>(`todo-lists/${id}`, payload);
  },
};
