import { ErrorMessage, Form, Formik } from 'formik';
import { MyTextInput } from '../form/MyTextInput';
import { Button, Header } from 'semantic-ui-react';
import { useAppDispatch } from '../../store/hooks';
import { registerUserAsync } from '../../store/user/userActions.thunk';
import { User } from '../../store/user/model/user';
import * as Yup from 'yup';
import { ValidationError } from '../errors/ValidationError';

interface InitialValuesState {
  displayName: string;
  username: string;
  email: string;
  password: string;
  error: string | null;
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const initialValues: InitialValuesState = {
    displayName: '',
    username: '',
    email: '',
    password: '',
    error: null,
  };

  function handleFormSubmit(values: InitialValuesState): Promise<User> {
    return dispatch(registerUserAsync(values));
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setErrors }) =>
        handleFormSubmit(values).catch((error) => {
          console.log({ error });
          setErrors({ error });
        })
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className='ui form error'
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <Header
            as='h2'
            content='Sign up to Reactivities'
            color='teal'
            textAlign='center'
          />
          <MyTextInput placeholder='DisplayName' name='displayName' />
          <MyTextInput placeholder='Username' name='username' />
          <MyTextInput placeholder='Email' name='email' />
          <MyTextInput placeholder='Password' name='password' type='password' />
          <ErrorMessage
            name='error'
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            type='submit'
            positive
            content='Register'
            loading={isSubmitting}
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
