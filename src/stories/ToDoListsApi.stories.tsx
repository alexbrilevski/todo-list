import { useEffect, useRef, useState } from 'react';
import { todoListsApi, type UpdateTaskRequestData } from '../api/todoListsApi';
import type { TaskPriority, TaskStatus } from '../models/task';

export default {
  title: 'TodoList/API',
};

export const GetTodolists = () => {
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    todoListsApi.getTodolists().then(response => {
      console.log('Data log - fetch todo lists data', response);
      setState(JSON.stringify(response.data));
    });
  }, []);

  return <div>{state}</div>;
};

export const CreateTodolist = () => {
  const [newToDoListTitle, setNewToDoListTitle] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (newToDoListTitle.trim() !== '') {
      todoListsApi.createTodolist(newToDoListTitle).then(response => {
        console.log('Data log - create todo list', response);
        setState(JSON.stringify(response.data));
        inputRef.current!.value = '';
      });
    }
  }, [newToDoListTitle]);

  const onCreateNewToDo = () => {
    const value = inputRef.current?.value;

    if (value) {
      setNewToDoListTitle(value);
    }
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          placeholder={"New Todo List Title"}
        />
        <button onClick={onCreateNewToDo}>Create new To Do</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const DeleteTodolist = () => {
  const [todoListId, setTodoListId] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '') {
      todoListsApi.deleteTodolist(todoListId).then(response => {
        console.log('Data log - remove todo list', response);
        setState(JSON.stringify(response.data));
        inputRef.current!.value = '';
      });
    }
  }, [todoListId]);


  const onDeleteToDo = () => {
    const value = inputRef.current?.value;

    if (value) {
      setTodoListId(value);
    }
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          placeholder={"Todo List ID"}
        />
        <button onClick={onDeleteToDo}>Delete To Do</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const UpdateTodolistTitle = () => {
  const [todoListId, setTodoListId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const todoIdRef = useRef<HTMLInputElement | null>(null);
  const newTitleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '' && title.trim() !== '') {
      todoListsApi.updateTodolistTitle(todoListId, title).then(response => {
        console.log('Data log - update todo list title', response);
        setState(JSON.stringify(response.data));
        todoIdRef.current!.value = '';
        newTitleRef.current!.value = '';
      });
    }
  }, [todoListId, title]);

  const onUpdateToDoTitle = () => {
    const todoIdValue = todoIdRef.current?.value;
    const titleValue = newTitleRef.current?.value;

    if (todoIdValue) {
      setTodoListId(todoIdValue);
    }

    if (titleValue) {
      setTitle(titleValue);
    }
  };

  return (
    <>
      <div>
        <input
          ref={todoIdRef}
          placeholder={"Todo List ID"}
        />
        <input
          ref={newTitleRef}
          placeholder={"New Title"}
        />
        <button onClick={onUpdateToDoTitle}>Update To Do Title</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const GetTasks = () => {
  const [todoListId, setTodoListId] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '') {
      todoListsApi.getTasks(todoListId).then(response => {
        console.log('Data log - get todo list tasks', response);
        setState(JSON.stringify(response.data));
        inputRef.current!.value = '';
      });
    }
  }, [todoListId]);

  const onGetTasks = () => {
    const value = inputRef.current?.value;

    if (value) {
      setTodoListId(value);
    }
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          placeholder={"Todo List ID"}
        />
        <button onClick={onGetTasks}>Get Tasks</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const CreateNewTask = () => {
  const [todoListId, setTodoListId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const todoIdRef = useRef<HTMLInputElement | null>(null);
  const newTitleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '' && title.trim() !== '') {
      todoListsApi.createTask(todoListId, title).then(response => {
        console.log('Data log - create task', response);
        setState(JSON.stringify(response.data));
        todoIdRef.current!.value = '';
        newTitleRef.current!.value = '';
      });
    }
  }, [todoListId, title]);

  const onCreateTask = () => {
    const todoIdValue = todoIdRef.current?.value;
    const titleValue = newTitleRef.current?.value;

    if (todoIdValue) {
      setTodoListId(todoIdValue);
    }

    if (titleValue) {
      setTitle(titleValue);
    }
  };

  return (
    <>
      <div>
        <input
          ref={todoIdRef}
          placeholder={"Todo List ID"}
        />
        <input
          ref={newTitleRef}
          placeholder={"New Task Title"}
        />
        <button onClick={onCreateTask}>Create Task</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const DeleteTask = () => {
  const [todoListId, setTodoListId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [state, setState] = useState<string | null>(null);
  const todoIdRef = useRef<HTMLInputElement | null>(null);
  const taskIdRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '' && taskId.trim() !== '') {
      todoListsApi.deleteTask(todoListId, taskId).then(response => {
        console.log('Data log - delete task', response);
        setState(JSON.stringify(response.data));
        todoIdRef.current!.value = '';
        taskIdRef.current!.value = '';
      });
    }
  }, [todoListId, taskId]);

  const onDeleteTask = () => {
    const todoIdValue = todoIdRef.current?.value;
    const taskIdValue = taskIdRef.current?.value;

    if (todoIdValue) {
      setTodoListId(todoIdValue);
    }

    if (taskIdValue) {
      setTaskId(taskIdValue);
    }
  };

  return (
    <>
      <div>
        <input
          ref={todoIdRef}
          placeholder={"Todo List ID"}
        />
        <input
          ref={taskIdRef}
          placeholder={"Task ID"}
        />
        <button onClick={onDeleteTask}>Delete Task</button>
      </div>
      <div>{state}</div>
    </>
  );
};

export const UpdateTask = () => {
  const initTaskState: UpdateTaskRequestData = {
    title: '',
    description: '',
    status: 0,
    priority: 0,
    startDate: '',
    deadline: '',
  };
  const [todoListId, setTodoListId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [task, setTask] = useState<UpdateTaskRequestData>(initTaskState);
  const [state, setState] = useState<string | null>(null);
  const todoIdRef = useRef<HTMLInputElement | null>(null);
  const taskIdRef = useRef<HTMLInputElement | null>(null);
  const newTitleRef = useRef<HTMLInputElement | null>(null);
  const newDescriptionRef = useRef<HTMLInputElement | null>(null);
  const newStatusRef = useRef<HTMLInputElement | null>(null);
  const newPriorityRef = useRef<HTMLInputElement | null>(null);
  const newStartDateRef = useRef<HTMLInputElement | null>(null);
  const newDeadlineRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (todoListId.trim() !== '' && taskId.trim() !== '') {
      todoListsApi.updateTask(todoListId, taskId, task).then(response => {
        console.log('Data log - create task', response);
        setState(JSON.stringify(response.data));
        todoIdRef.current!.value = '';
        taskIdRef.current!.value = '';
        newTitleRef.current!.value = '';
        newDescriptionRef.current!.value = '';
        newStatusRef.current!.value = '';
        newStartDateRef.current!.value = '';
        newDeadlineRef.current!.value = '';
      });
    }
  }, [todoListId, taskId, task]);

  const onUpdateTask = () => {
    const todoIdValue = todoIdRef.current?.value;
    const taskIdValue = taskIdRef.current?.value;
    const titleValue = newTitleRef.current?.value;
    const descriptionValue = newDescriptionRef.current?.value;
    const statusValue = newStatusRef.current?.value;
    const priorityValue = newPriorityRef.current?.value;
    const startDateValue = newStartDateRef.current?.value;
    const deadlineValue = newDeadlineRef.current?.value;

    if (todoIdValue) {
      setTodoListId(todoIdValue);
    }

    if (taskIdValue) {
      setTaskId(taskIdValue);
    }

    if (
      titleValue &&
      descriptionValue &&
      statusValue &&
      priorityValue &&
      startDateValue &&
      deadlineValue
    ) {
      setTask({
        title: titleValue,
        description: descriptionValue,
        status: +statusValue as TaskStatus,
        priority: +priorityValue as TaskPriority,
        startDate: startDateValue,
        deadline: deadlineValue,
      });
    }
  };

  return (
    <>
      <div>
        <input
          ref={todoIdRef}
          placeholder={"Todo List ID"}
        />
        <input
          ref={taskIdRef}
          placeholder={"Task ID"}
        />
        <input
          ref={newTitleRef}
          placeholder={"New Title"}
        />
        <input
          ref={newDescriptionRef}
          placeholder={"New Description"}
        />
        <input
          ref={newStatusRef}
          type={"number"}
          placeholder={"New Status"}
        />
        <input
          ref={newPriorityRef}
          type={"number"}
          placeholder={"New Priority"}
        />
        <input
          ref={newStartDateRef}
          placeholder={"New Start Date"}
        />
        <input
          ref={newDeadlineRef}
          placeholder={"New Deadline"}
        />
        <button onClick={onUpdateTask}>Update Task</button>
      </div>
      <div>{state}</div>
    </>
  );
};
