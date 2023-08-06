import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { ActivityDashboard } from '../../features/activities/presenter/ActivityDashboard';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default App;
