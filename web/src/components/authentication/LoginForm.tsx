import { ErrorMessage, Form, Formik } from 'formik';
import { MyTextInput } from '../form/MyTextInput';
import { Button, Header, Label } from 'semantic-ui-react';
import { useAppDispatch } from '../../store/hooks';
import { loginUserAsync } from '../../store/user/userActions.thunk';
import { User } from '../../store/user/model/user';

interface InitialValuesState {
  email: string;
  password: string;
  error: string | null;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const initialValues: InitialValuesState = {
    email: '',
    password: '',
    error: null,
  };

  function handleFormSubmit(
    values: InitialValuesState
  ): Promise<User | undefined> {
    return dispatch(loginUserAsync(values));
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setErrors }) =>
        handleFormSubmit(values).catch((user) => {
          if (!user) setErrors({ error: 'Invalid email or pasword' });
        })
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' autoComplete='off' onSubmit={handleSubmit}>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='teal'
            textAlign='center'
          />
          <MyTextInput placeholder='Email' name='email' />
          <MyTextInput placeholder='Password' name='password' type='password' />
          <ErrorMessage
            name='error'
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color='red'
                content={errors.error}
              />
            )}
          />
          <Button
            type='submit'
            positive
            content='Login'
            loading={isSubmitting}
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
