import { useCallback, type FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import type { RequestStatus } from '../models/app';
import { AppBar, Button, LinearProgress, Toolbar } from '@mui/material';
import { logoutTC } from '../store/authReducer';

const AppHeader: FC = () => {
  const status = useAppSelector<RequestStatus>(state => state.app.status);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const onLogoutClick = useCallback(() => {
    dispatch(logoutTC());
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        {isLoggedIn &&
          <Button color="inherit" onClick={onLogoutClick}>
            Log out
          </Button>
        }
      </Toolbar>
      {status === 'loading' && <LinearProgress color='info' />}
    </AppBar>
  );
};

export default AppHeader;
