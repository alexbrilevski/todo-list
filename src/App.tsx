import { type FC } from 'react';
import ErrorSnackbar from './components/UI/ErrorSnackbar/ErrorSnackbar';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/material';
import ToDoListsList from './components/ToDoListsList';

type AppProps = {
  isDemo?: boolean,
};

const App: FC<AppProps> = ({ isDemo = false }) => {
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppHeader />
      <Container fixed>
        <ToDoListsList isDemo={isDemo} />
      </Container>
    </div>
  );
}

export default App;
