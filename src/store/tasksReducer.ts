import type { Dispatch } from 'redux';
import {
  TaskPriorities,
  TaskStatuses,
  type TaskStatus,
  type TaskType
} from '../models/task';
import {
  TODOLIST_ACTION_TYPES,
  type AddTodoListAction,
  type RemovedTodoListAction,
  type SetTodoListsAction
} from './todoListsReducer';
import { v1 } from 'uuid';
import { todoListsApi } from '../api/todoListsApi';

const TASK_ACTION_TYPES = {
  SET_TAKS: 'task/SET_TASKS',
  ADD: 'task/ADD',
  CHANGE_TITLE: 'task/CHANGE_TITLE',
  CHANGE_STATUS: 'task/CHANGE_STATUS',
  REMOVE: 'task/REMOVE',
} as const;

export type TasksStateType = {
  [key: string]: Array<TaskType>,
};

type SetTasksAction = ReturnType<typeof setTasksAC>;
type AddTaskAction = ReturnType<typeof addTaskAC>;
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>;
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>;
type RemovedTaskAction = ReturnType<typeof removeTaskAC>;

export type TaskActions =
  SetTasksAction |
  AddTaskAction |
  ChangeTaskTitleAction |
  ChangeTaskStatusAction |
  RemovedTaskAction |
  SetTodoListsAction |
  AddTodoListAction |
  RemovedTodoListAction;

const initState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initState, action: TaskActions): TasksStateType => {
  switch (action.type) {
    case TASK_ACTION_TYPES.SET_TAKS: {
      const updatedState = { ...state };
      updatedState[action.todoListId] = action.tasks;
      return updatedState;
    }
    case TASK_ACTION_TYPES.ADD:
      const newTask: TaskType = {
        id: v1(),
        todoListId: action.todoId,
        title: action.title,
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
      };

      return {
        ...state,
        [action.todoId]: [
          ...state[action.todoId],
          newTask,
        ],
      };
    case TASK_ACTION_TYPES.CHANGE_TITLE:
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId ? { ...task, title: action.title } : task
        ),
      };
    case TASK_ACTION_TYPES.CHANGE_STATUS:
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId ? { ...task, status: action.status } : task
        ),
      };
    case TASK_ACTION_TYPES.REMOVE:
      return {
        ...state,
        [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId),
      };
    case TODOLIST_ACTION_TYPES.SET_TODOS: {
      const updatedState = { ...state };
      action.todos.forEach(todo => updatedState[todo.id] = []);
      return updatedState;
    }
    case TODOLIST_ACTION_TYPES.ADD:
      return { ...state, [action.newTodo.id]: [] };
    case TODOLIST_ACTION_TYPES.REMOVE:
      const updatedState = { ...state };
      delete updatedState[action.id];
      return updatedState;
    default:
      return state;
  }
};

export const setTasksAC = (todoListId: string, tasks: Array<TaskType>) => {
  return { type: TASK_ACTION_TYPES.SET_TAKS, todoListId, tasks };
};

export const addTaskAC = (todoId: string, title: string) => {
  return { type: TASK_ACTION_TYPES.ADD, todoId, title };
};

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
  return { type: TASK_ACTION_TYPES.CHANGE_TITLE, todoId, taskId, title };
};

export const changeTaskStatusAC = (todoId: string, taskId: string, status: TaskStatus) => {
  return { type: TASK_ACTION_TYPES.CHANGE_STATUS, todoId, taskId, status };
};

export const removeTaskAC = (todoId: string, taskId: string) => {
  return { type: TASK_ACTION_TYPES.REMOVE, todoId, taskId };
};

export const fetchTasks = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    todoListsApi.getTasks(todoListId).then(response => {
      dispatch(setTasksAC(todoListId, response.data.items));
    });
  };
};
