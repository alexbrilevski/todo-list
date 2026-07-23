import {
  type DomainTask,
  type TaskType
} from '../models/task';
import {
  TODOLIST_ACTION_TYPES,
  type AddTodoListAction,
  type ClearTodoListsDataAction,
  type RemovedTodoListAction,
  type SetTodoListsAction
} from './todoListsReducer';
import { todoListsApi, type UpdateTaskRequestData } from '../api/todoListsApi';
import type { AppThunk } from './store';
import { setAppStatusAC } from './appReducer';
import type { RequestStatus } from '../models/app';
import { handleRequestError, handleResponseError } from '../utils/errorUtils';

const TASK_ACTION_TYPES = {
  SET_TAKS: 'task/SET_TASKS',
  ADD: 'task/ADD',
  UPDATE: 'task/UPDATE',
  REMOVE: 'task/REMOVE',
  CHANGE_ENTITY_STATUS: 'task/CHANGE_ENTITY_STATUS',
} as const;

export type TasksStateType = {
  [key: string]: Array<DomainTask>,
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
  ReturnType<typeof changeTaskEntityStatusAC> |
  SetTodoListsAction |
  AddTodoListAction |
  RemovedTodoListAction |
  ClearTodoListsDataAction;

const initState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initState, action: TaskActions): TasksStateType => {
  switch (action.type) {
    case TASK_ACTION_TYPES.SET_TAKS: {
      const updatedState = { ...state };
      updatedState[action.todoListId] =
        action.tasks.map(task => ({ ...task, entityStatus: 'idle' }));
      return updatedState;
    }
    case TASK_ACTION_TYPES.ADD:
      return {
        ...state,
        [action.newTask.todoListId]: [
          { ...action.newTask, entityStatus: 'idle' },
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
    case TASK_ACTION_TYPES.CHANGE_ENTITY_STATUS: {
      return {
        ...state,
        [action.todoId]: state[action.todoId].map(task =>
          task.id === action.id ? { ...task, entityStatus: action.status } : task
        ),
      };
    }
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
    case TODOLIST_ACTION_TYPES.CLEAR_TODOS: {
      return {};
    }
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

export const changeTaskEntityStatusAC = (todoId: string, id: string, status: RequestStatus) => {
  return { type: TASK_ACTION_TYPES.CHANGE_ENTITY_STATUS, todoId, id, status };
};

export const fetchTasks = (todoListId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.getTasks(todoListId)
      .then(response => {
        dispatch(setTasksAC(todoListId, response.data.items));
        dispatch(setAppStatusAC('succeeded'));
      })
      .catch(error => {
        handleRequestError(error, dispatch);
      });;
  };
};

export const addTaskTC = (todoListId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.createTask(todoListId, title)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(addTaskAC(response.data.data.item));
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleResponseError(response.data, dispatch);
        }
      })
      .catch(error => {
        handleRequestError(error, dispatch);
      });
  };
};

export const updateTaskTC = (todoListId: string, taskId: string, taskModel: UpdateTaskModel): AppThunk => {
  return (dispatch, getState) => {
    const taskToUpdate = getState().tasks[todoListId].find(task => task.id === taskId);

    if (taskToUpdate) {
      const updateRequestTaskModel = { ...taskToUpdate, ...taskModel };

      dispatch(setAppStatusAC('loading'));
      todoListsApi.updateTask(todoListId, taskId, updateRequestTaskModel)
        .then(response => {
          if (response.data.resultCode === 0) {
            dispatch(updateTaskAC(todoListId, taskId, taskModel));
            dispatch(setAppStatusAC('succeeded'));
          } else {
            handleResponseError(response.data, dispatch);
          }
        })
        .catch(error => {
          handleRequestError(error, dispatch);
        });;
    }
  };
};

export const deleteTaskTC = (todoId: string, taskId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTaskEntityStatusAC(todoId, taskId, 'loading'));
    todoListsApi.deleteTask(todoId, taskId)
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(removeTaskAC(todoId, taskId));
          dispatch(setAppStatusAC('succeeded'));
        } else {
          handleResponseError(response.data, dispatch);
        }
      })
      .catch(error => {
        handleRequestError(error, dispatch);
      });;
  };
};
