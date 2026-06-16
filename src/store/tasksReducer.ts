import type { Dispatch } from 'redux';
import {
  type TaskType
} from '../models/task';
import {
  TODOLIST_ACTION_TYPES,
  type AddTodoListAction,
  type RemovedTodoListAction,
  type SetTodoListsAction
} from './todoListsReducer';
import { todoListsApi, type UpdateTaskRequestData } from '../api/todoListsApi';
import type { RootState } from './store';

const TASK_ACTION_TYPES = {
  SET_TAKS: 'task/SET_TASKS',
  ADD: 'task/ADD',
  UPDATE: 'task/UPDATE',
  REMOVE: 'task/REMOVE',
} as const;

export type TasksStateType = {
  [key: string]: Array<TaskType>,
};

type UpdateTaskModel = Partial<UpdateTaskRequestData>;

type SetTasksAction = ReturnType<typeof setTasksAC>;
type AddTaskAction = ReturnType<typeof addTaskAC>;
type UpdateTaskAction = ReturnType<typeof updateTaskAC>;
type RemovedTaskAction = ReturnType<typeof removeTaskAC>;

export type TaskActions =
  SetTasksAction |
  AddTaskAction |
  UpdateTaskAction |
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
      return {
        ...state,
        [action.newTask.todoListId]: [
          action.newTask,
          ...state[action.newTask.todoListId],
        ],
      };
    case TASK_ACTION_TYPES.UPDATE:
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.taskId ? { ...task, ...action.taskModel } : task
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

export const addTaskAC = (newTask: TaskType) => {
  return { type: TASK_ACTION_TYPES.ADD, newTask };
};

export const updateTaskAC = (todoId: string, taskId: string, taskModel: UpdateTaskModel) => {
  return { type: TASK_ACTION_TYPES.UPDATE, todoId, taskId, taskModel };
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

export const addTaskTC = (todoListId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todoListsApi.createTask(todoListId, title).then(response => {
      if (response.data) {
        dispatch(addTaskAC(response.data.data.item));
      }
    });
  };
};

export const updateTaskTC = (todoListId: string, taskId: string, taskModel: UpdateTaskModel) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const taskToUpdate = getState().tasks[todoListId].find(task => task.id === taskId);

    if (taskToUpdate) {
      const updateRequestTaskModel = { ...taskToUpdate, ...taskModel };

      todoListsApi.updateTask(todoListId, taskId, updateRequestTaskModel).then(response => {
        if (response.data) {
          dispatch(updateTaskAC(todoListId, taskId, taskModel));
        }
      });
    }
  };
};
