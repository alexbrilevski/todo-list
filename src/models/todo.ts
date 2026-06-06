export type TodoListFilterValues = 'all' | 'active' | 'completed';

export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number,
};

export type TodoListDomainType = TodoListType & { filter: TodoListFilterValues };
