import type { RequestStatus } from "./app";

export const TaskStatuses = {
  New: 0,
  InProgress: 1,
  Completed: 2,
  Draft: 3,
} as const;

export type TaskStatus = typeof TaskStatuses[keyof typeof TaskStatuses];

export const TaskPriorities = {
  Low: 0,
  Middle: 1,
  High: 2,
  Urgent: 3,
  Later: 4,
} as const;

export type TaskPriority = typeof TaskPriorities[keyof typeof TaskPriorities];

export type TaskType = {
  id: string,
  todoListId: string,
  title: string,
  description: string,
  status: TaskStatus,
  priority: TaskPriority,
  addedDate: string,
  startDate: string,
  deadline: string,
  order: number,
};

export type DomainTask = TaskType & {
  entityStatus: RequestStatus,
};
