import { Container, Header, Segment } from 'semantic-ui-react';
import { selectServerError } from '../../store/common/selectors';
import { useAppSelector } from '../../store/hooks';

export function ServerError() {
  const serverError = useAppSelector(selectServerError);
  return (
    <Container>
      <Header as='h1' content='Server Error' />
      <Header sub as='h5' color='red' content={serverError?.message} />
      {serverError?.details && (
        <Segment>
          <Header as='h4' content='Stack trace' color='teal' />
          <code style={{ marginTop: 10 }}>{serverError.details}</code>
        </Segment>
      )}
    </Container>
  );
}
