import { combineReducers, createStore, applyMiddleware } from 'redux';
import { appReducer, type AppActions } from './appReducer';
import { authReducer, type AuthActions } from './authReducer';
import { todoListsReducer, type TodoListActions } from './todoListsReducer';
import { tasksReducer, type TaskActions } from './tasksReducer';
import { thunk, type ThunkAction, type ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = AppActions | AuthActions | TodoListActions | TaskActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, RootAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, RootAction>;

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  todos: todoListsReducer,
  tasks: tasksReducer,
});

// Custom useSelector and useDispatch: Use throughout app instead of plain useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const store = createStore(rootReducer, applyMiddleware(thunk));
