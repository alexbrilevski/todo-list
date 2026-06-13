import { combineReducers, createStore, applyMiddleware } from 'redux';
import { todoListsReducer, type TodoListActions } from './todoListsReducer';
import { tasksReducer, type TaskActions } from './tasksReducer';
import { thunk, type ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export type RootState = ReturnType<typeof rootReducer>;
export type RootActionTypes = TodoListActions | TaskActions;
type AppDispatchType = ThunkDispatch<RootState, unknown, RootActionTypes>;

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
});

// Custom useSelector and useDispatch: Use throughout app instead of plain useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

export const store = createStore(rootReducer, applyMiddleware(thunk));
