import type { Dispatch } from 'redux';
import type { TodoListFilterValues, TodoListDomainType, TodoListType } from '../models/todo';
import { todoListsApi } from '../api/todoListsApi';
import { setAppErrorAC, setAppStatusAC } from './appReducer';

export const TODOLIST_ACTION_TYPES = {
  SET_TODOS: 'todoList/SET_TODOS',
  ADD: 'todoList/ADD',
  CHANGE_TITLE: 'todoList/CHANGE_TITLE',
  CHANGE_FILTER: 'todoList/CHANGE_FILTER',
  REMOVE: 'todoList/REMOVE',
} as const;

export type SetTodoListsAction = ReturnType<typeof setTodoListsAC>;
export type AddTodoListAction = ReturnType<typeof addTodoListAC>;
type ChangeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>;
type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilterAC>;
export type RemovedTodoListAction = ReturnType<typeof removeTodoListAC>;

export type TodoListActions =
  SetTodoListsAction |
  AddTodoListAction |
  ChangeTodoListTitleAction |
  ChangeTodoListFilterAction |
  RemovedTodoListAction;

const initState: Array<TodoListDomainType> = [];

export const todoListsReducer = (state: Array<TodoListDomainType> = initState, action: TodoListActions): Array<TodoListDomainType> => {
  switch (action.type) {
    case TODOLIST_ACTION_TYPES.SET_TODOS:
      return action.todos.map(todo => ({ ...todo, filter: 'all' }));
    case TODOLIST_ACTION_TYPES.ADD:
      return [
        { ...action.newTodo, filter: 'all' },
        ...state,
      ];
    case TODOLIST_ACTION_TYPES.CHANGE_TITLE:
      return state.map(todo => todo.id === action.id ?
        { ...todo, title: action.title } : todo);
    case TODOLIST_ACTION_TYPES.CHANGE_FILTER:
      return state.map(todo => todo.id === action.id ?
        { ...todo, filter: action.filter } : todo);
    case TODOLIST_ACTION_TYPES.REMOVE:
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

export const setTodoListsAC = (todos: Array<TodoListType>) => {
  return { type: TODOLIST_ACTION_TYPES.SET_TODOS, todos };
};

export const addTodoListAC = (newTodo: TodoListType) => {
  return { type: TODOLIST_ACTION_TYPES.ADD, newTodo };
};

export const changeTodoListTitleAC = (id: string, title: string) => {
  return { type: TODOLIST_ACTION_TYPES.CHANGE_TITLE, id, title };
};

export const changeTodoListFilterAC = (id: string, filter: TodoListFilterValues) => {
  return { type: TODOLIST_ACTION_TYPES.CHANGE_FILTER, id, filter };
};

export const removeTodoListAC = (id: string) => {
  return { type: TODOLIST_ACTION_TYPES.REMOVE, id };
};

export const fetchTodoLists = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.getTodolists().then(response => {
      dispatch(setTodoListsAC(response.data));
      dispatch(setAppStatusAC('succeeded'));
    });
  };
};

export const addTodoListTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.createTodolist(title).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(addTodoListAC(response.data.data.item));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        if (response.data.messages.length) {
          dispatch(setAppErrorAC(response.data.messages[0]));
        } else {
          dispatch(setAppErrorAC('An unknown error occurred'));
        }
        dispatch(setAppStatusAC('failed'));
      }
    });
  };
};

export const changeTodoListTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.updateTodolistTitle(id, title).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(changeTodoListTitleAC(id, title));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        if (response.data.messages.length) {
          dispatch(setAppErrorAC(response.data.messages[0]));
        } else {
          dispatch(setAppErrorAC('An unknown error occurred'));
        }
        dispatch(setAppStatusAC('failed'));
      }
    });
  };
};

export const removeTodoListTC = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todoListsApi.deleteTodolist(id).then(response => {
      if (response.data.resultCode === 0) {
        dispatch(removeTodoListAC(id));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        if (response.data.messages.length) {
          dispatch(setAppErrorAC(response.data.messages[0]));
        } else {
          dispatch(setAppErrorAC('An unknown error occurred'));
        }
        dispatch(setAppStatusAC('failed'));
      }
    });
  };
};
