import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  setTodoListsAC,
  todoListsReducer
} from './todoListsReducer';
import type { TodoListFilterValues, TodoListDomainType, TodoListType } from '../models/todo';
import { v1 } from 'uuid';

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListDomainType>;

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {
      id: todoListId1,
      title: "What to learn",
      addedDate: "",
      order: 0,
      filter: "all",
    },
    {
      id: todoListId2,
      title: "What to buy",
      addedDate: "",
      order: 1,
      filter: "all",
    },
  ];
});

test('Todo list is correctly added', () => {
  const newTodo: TodoListType = { id: v1(), title: "New Todolist", addedDate: "", order: 0 };
  const action = addTodoListAC(newTodo);

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodo.title);
});

test('Todo list title changes correctly', () => {
  const newTodolistTitle = "New Todolist";
  const action = changeTodoListTitleAC(todoListId2, newTodolistTitle);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('Todo list filter changes correctly', () => {
  const newFilter: TodoListFilterValues = "completed";
  const action = changeTodoListFilterAC(todoListId2, newFilter);

  const endState = todoListsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});


test('Todo list is correctly removed', () => {
  const action = removeTodoListAC(todoListId1);

  const endState = todoListsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('Todo lists are set correctly to app state', () => {
  const action = setTodoListsAC(startState);
  const endState = todoListsReducer([], action);

  expect(endState.length).toBe(2);
});
