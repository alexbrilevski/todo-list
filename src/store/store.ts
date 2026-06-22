import { combineReducers, createStore, applyMiddleware } from 'redux';
import { appReducer, type AppActions } from './appReducer';
import { todoListsReducer, type TodoListActions } from './todoListsReducer';
import { tasksReducer, type TaskActions } from './tasksReducer';
import { thunk, type ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;
export type RootActionTypes = AppActions | TodoListActions | TaskActions;
type AppDispatchType = ThunkDispatch<RootState, unknown, RootActionTypes>;

const rootReducer = combineReducers({
  app: appReducer,
  todos: todoListsReducer,
  tasks: tasksReducer,
});

// Custom useSelector and useDispatch: Use throughout app instead of plain useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const store = createStore(rootReducer, applyMiddleware(thunk));
