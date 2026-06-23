import type { FC } from 'react';
import { useAppSelector } from '../store/store';
import type { RequestStatus } from '../models/app';
import { AppBar, Button, LinearProgress, Toolbar } from '@mui/material';

const AppHeader: FC = () => {
  const status = useAppSelector<RequestStatus>(state => state.app.status);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
      {status === 'loading' && <LinearProgress color='info'/>}
    </AppBar>
  );
};

export default AppHeader;
