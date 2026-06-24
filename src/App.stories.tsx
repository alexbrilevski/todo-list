import type { Meta, StoryObj } from "@storybook/react-vite";
import { v1 } from "uuid";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { appReducer } from "./store/appReducer";
import { todoListsReducer } from "./store/todoListsReducer";
import { tasksReducer } from "./store/tasksReducer";
import type { RootState } from "./store/store";
import { TaskPriorities, TaskStatuses } from "./models/task";

import App from "./App";

const mockPreloadedState: RootState = {
  app: {
    status: "idle",
    error: null,
  },
  todos: [
    {
      id: "todolistId1",
      title: "What to Learn",
      addedDate: "",
      order: 0,
      filter: "all",
      entityStatus: 'idle'
    },
    {
      id: "todolistId2",
      title: "What to Buy",
      addedDate: "",
      order: 1,
      filter: "all",
      entityStatus: 'idle',
    },
  ],
  tasks: {
    "todolistId1": [
      {
        id: v1(), title: "HTML&CSS", todoListId: "todolistId1", description: "",
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: "", deadline: "", addedDate: "", order: 0, entityStatus: "idle",
      },
      {
        id: v1(), title: "JS", todoListId: "todolistId1", description: "",
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: "", deadline: "", addedDate: "", order: 0, entityStatus: "idle",
      },
    ],
    "todolistId2": [
      {
        id: v1(), title: "Bread", todoListId: "todolistId2", description: "",
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: "", deadline: "", addedDate: "", order: 0, entityStatus: "idle",
      },
      {
        id: v1(), title: "Milk", todoListId: "todolistId2", description: "",
        status: TaskStatuses.Completed, priority: TaskPriorities.Low,
        startDate: "", deadline: "", addedDate: "", order: 0, entityStatus: "idle",
      },
      {
        id: v1(), title: "Bread", todoListId: "todolistId2", description: "",
        status: TaskStatuses.New, priority: TaskPriorities.Low,
        startDate: "", deadline: "", addedDate: "", order: 0, entityStatus: "idle",
      },
    ],
  },
};

const rootReducer = combineReducers({
  app: appReducer,
  todos: todoListsReducer,
  tasks: tasksReducer,
});

const mockStore = createStore(rootReducer, mockPreloadedState as RootState, applyMiddleware(thunk));

const meta = {
  title: "TodoList/App",
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <Provider store={mockStore}>
          <Story />
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isDemo: true,
  }
};
