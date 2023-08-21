import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsLoggedIn } from '../../store/user/userSelectors';
import { open } from '../../store/modal/modalSlice';
import LoginPage from '../../components/authentication/LoginForm';
import RegisterPage from '../../components/authentication/RegisterForm';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => dispatch(open(<LoginPage />))}
              size='huge'
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => dispatch(open(<RegisterPage />))}
              size='huge'
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
}
