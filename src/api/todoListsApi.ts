import axios from 'axios';
import type { TodoListType } from '../models/todo';
import type { TaskType, TaskPriority, TaskStatus } from '../models/task';

export type ResponseData<D = {}> = {
  data: D,
  resultCode: number,
  messages: Array<string>,
  fieldsErrors: Array<string>,
};

type GetTasksResponseData = {
  items: Array<TaskType>,
  totalCount: number,
  error: string | null,
};

export type UpdateTaskRequestData = {
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
  startDate: string,
  deadline: string,
};

export type LoginParams = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: string,
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
      .post<ResponseData<{ item: TodoListType }>>('todo-lists', payload);
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
  getTasks(todoListId: string) {
    return baseInstance
      .get<GetTasksResponseData>(`todo-lists/${todoListId}/tasks`);
  },
  createTask(todoListId: string, title: string) {
    const payload = { title };

    return baseInstance
      .post<ResponseData<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, payload);
  },
  deleteTask(todoListId: string, taskId: string) {
    return baseInstance
      .delete<ResponseData>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
  updateTask(todoListId: string, taskId: string, taskModel: UpdateTaskRequestData) {
    return baseInstance
      .put<ResponseData<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, taskModel);
  },
};

export const authAPI = {
  me() {
    return baseInstance
      .get<ResponseData<{id: number, email: string, login: string}>>('auth/me');
  },
  login(payload: LoginParams) {
    return baseInstance
      .post<ResponseData<{userId?: number}>>('auth/login', payload);
  },
  logout() {
    return baseInstance
      .delete<ResponseData>('auth/login');
  }
};
