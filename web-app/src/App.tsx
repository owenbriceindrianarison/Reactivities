import { Outlet, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import HomePage from './pages/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
