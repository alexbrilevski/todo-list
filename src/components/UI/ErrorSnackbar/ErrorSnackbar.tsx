import { forwardRef, type SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { type AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setAppErrorAC } from '../../../store/appReducer';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant={"filled"} {...props} />;
});

const ErrorSnackbar = () => {
  const error = useAppSelector<string | null>(state => state.app.error);
  const dispatch = useAppDispatch();

  const isOpen = error !== null;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={"error"} sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
