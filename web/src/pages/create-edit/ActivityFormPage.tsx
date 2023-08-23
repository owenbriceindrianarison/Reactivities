import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  Activity,
  ActivityFormValues,
} from '../../store/activities/model/activity';
import {
  createOrEditActivityAsync,
  getActivityAsync,
} from '../../store/activities/activityActions.thunk';
import { MyTextInput } from '../../components/form/MyTextInput';
import { MyTextArea } from '../../components/form/MyTextArea';
import { MySelectInput } from '../../components/form/MySelectInput';
import { CATEGORY_OPTIONS } from '../../utils/constants';
import { MyDateInput } from '../../components/form/MyDateInput';

export default function ActivityFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    category: Yup.string().required('The activity category is required'),
    description: Yup.string().required('The activity description is required'),
    date: Yup.string().required('The activity date is required'),
    city: Yup.string().required('The activity city is required'),
    venue: Yup.string().required('The activity venue is required'),
  });

  useEffect(() => {
    if (id) {
      dispatch(getActivityAsync(id)).then((activity) =>
        setActivity(new ActivityFormValues(activity!))
      );
    }
  }, [id, dispatch]);

  function handleFormSubmit(activity: ActivityFormValues) {
    dispatch(createOrEditActivityAsync(activity)).then((activity) =>
      navigate(`/activities/${activity!.id}`)
    );
  }

  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        enableReinitialize
        initialValues={activity}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput placeholder='Title' name='title' />
            <MyTextArea placeholder='Description' name='description' rows={3} />
            <MySelectInput
              options={CATEGORY_OPTIONS}
              placeholder='Category'
              name='category'
            />
            <MyDateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              as={Link}
              to='/activities'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
