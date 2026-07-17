import { type FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorSnackbar from './components/UI/ErrorSnackbar/ErrorSnackbar';
import AppHeader from './components/AppHeader';
import { Container } from '@mui/material';
import ToDoListsList from './components/ToDoListsList';
import Login from './components/Login';

type AppProps = {
  isDemo?: boolean,
};

const App: FC<AppProps> = ({ isDemo = false }) => {
  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppHeader />
        <Container fixed>
          <Routes>
            <Route path="/" element={<ToDoListsList isDemo={isDemo} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error404" element={<h1>Error 404: Page not found</h1>} />
            <Route path="*" element={<Navigate to="/error404" />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
