import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
  type TasksStateType
} from './tasksReducer';
import type { TodoListDomainType } from '../models/todo';
import { addTodoListAC, removeTodoListAC, todoListsReducer } from './todoListsReducer';

const todoListId1: string = 'todoListId1';
const todoListId2: string = 'todoListId2';
let startState: TasksStateType;

beforeEach(() => {
  startState = {
    [todoListId1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },

    ],
    [todoListId2]: [
      { id: '1', title: 'Bread', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Tea', isDone: false },
    ],
  };
});

test('Task is correctly added to specified Todo list', () => {
  const todoId = todoListId2;
  const newTaskTitle = 'Juce';
  const action = addTaskAC(todoId, newTaskTitle);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1].length).toBe(3);
  expect(endState[todoId].length).toBe(4);
  expect(endState[todoId][3].id).toBeDefined();
  expect(endState[todoId][3].title).toBe(newTaskTitle);
  expect(endState[todoId][3].isDone).toBeFalsy;
});

test('Task title changes correctly in specified Todo list', () => {
  const todoId = 'todoListId2';
  const taskId = '2';
  const newTaskTitle = 'Coffee';
  const action = changeTaskTitleAC(todoId, taskId, newTaskTitle);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][1].title).toBe('JS');
  expect(endState[todoId][1].title).toBe(newTaskTitle);
});

test('Task status changes correctly in specified Todo list', () => {
  const todoId = todoListId2;
  const taskId = '2';
  const status = false;
  const action = changeTaskStatusAC(todoId, taskId, status);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][1].isDone).toBeTruthy;
  expect(endState[todoId][1].isDone).toBe(status);
});


test('Task is correctly removed from specified Todo list', () => {
  const action = removeTaskAC(todoListId2, '2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    [todoListId1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },

    ],
    [todoListId2]: [
      { id: '1', title: 'Bread', isDone: false },
      { id: '3', title: 'Tea', isDone: false },
    ],
  });
});

test('Property with an empty array is added to state when a new Todo list is added', () => {
  const action = addTodoListAC('New Todo list');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != todoListId1 && k != todoListId2);
  if (!newKey) {
    throw Error('New key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('Todo list Ids added to Todo lists and Tasks state is equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodoListDomainType> = [];

  const action = addTodoListAC('New Todo list');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodoListsState = todoListsReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodoListsState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromTodolists).toBe(action.id);
});

test('Property with specified Todo list Id should be deleted from state', () => {
  const action = removeTodoListAC(todoListId2);

  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);;

  expect(keys.length).toBe(1);
  expect(endState[todoListId2]).not.toBeDefined();
});

