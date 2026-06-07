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
import { TaskPriorities, TaskStatuses } from '../models/task';

const todoListId1: string = 'todoListId1';
const todoListId2: string = 'todoListId2';
let startState: TasksStateType;

beforeEach(() => {
  startState = {
    [todoListId1]: [
      {
        id: '1', title: 'HTML & CSS', todoListId: todoListId1, description: '',
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '2', title: 'JS', todoListId: todoListId1, description: '',
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '3', title: 'React', todoListId: todoListId1, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todoListId2]: [
      {
        id: '1', title: 'Bread', todoListId: todoListId2, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '2', title: 'Milk', todoListId: todoListId2, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '3', title: 'Tea', todoListId: todoListId2, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
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
  expect(endState[todoId][3].status).toBe(TaskStatuses.New);
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
  const status = TaskStatuses.New;
  const action = changeTaskStatusAC(todoId, taskId, status);

  const endState = tasksReducer(startState, action);

  expect(endState[todoListId1][1].status).toBe(TaskStatuses.Completed);
  expect(endState[todoId][1].status).toBe(status);
});


test('Task is correctly removed from specified Todo list', () => {
  const action = removeTaskAC(todoListId2, '2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    [todoListId1]: [
      {
        id: '1', title: 'HTML & CSS', todoListId: todoListId1, description: '',
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '2', title: 'JS', todoListId: todoListId1, description: '',
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '3', title: 'React', todoListId: todoListId1, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
    ],
    [todoListId2]: [
      {
        id: '1', title: 'Bread', todoListId: todoListId2, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
      {
        id: '3', title: 'Tea', todoListId: todoListId2, description: '',
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: '', deadline: '', addedDate: '', order: 0,
      },
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

