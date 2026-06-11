import { combineReducers, createStore, applyMiddleware } from 'redux';
import { todoListsReducer } from './todoListsReducer';
import { tasksReducer } from './tasksReducer';
import { thunk } from 'redux-thunk';

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todos: todoListsReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
