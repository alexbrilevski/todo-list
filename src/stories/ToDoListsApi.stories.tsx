import { useEffect, useRef, useState } from 'react';
import { todoListsApi } from '../api/todoListsApi';

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
