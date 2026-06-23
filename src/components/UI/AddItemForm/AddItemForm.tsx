import {
  memo,
  useState,
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import { IconButton, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

type AddItemFormProps = {
  addItem: (title: string) => void,
  disabled?: boolean,
};

const AddItemForm: FC<AddItemFormProps> = memo(({ addItem, disabled }) => {
  const [itemValue, setItemValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (itemValue.trim() !== '') {
      addItem(itemValue);
      setItemValue('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(null);
    }

    setItemValue(e.target.value);
  };

  const onNewTaskTitleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  return (
    <>
      <div>
        <TextField
          label="Title"
          value={itemValue}
          onChange={onChangeNewTaskTitle}
          onKeyUp={onNewTaskTitleKeyUp}
          error={!!error}
          helperText={error}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={addItemHandler}
          disabled={disabled}
        >
          <Add />
        </IconButton>
      </div>
    </>
  );
});

export default AddItemForm;
