import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCreatingStatus } from '../../store/activities/selectors';
import { Activity } from '../../store/activities/model/activity';
import {
  createOrEditActivityAsync,
  getActivityAsync,
} from '../../store/activities/actions.thunk';

export default function ActivityFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const creatingStatus = useAppSelector(selectCreatingStatus);
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getActivityAsync(id)).then((activity) => setActivity(activity!));
    }
  }, [id, dispatch]);

  function handleSubmit() {
    dispatch(createOrEditActivityAsync(activity)).then((activity) =>
      navigate(`/activities/${activity!.id}`)
    );
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder='Title'
          name='title'
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          name='description'
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          name='category'
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          name='date'
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          name='city'
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          name='venue'
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={creatingStatus === 'loading'}
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
    </Segment>
  );
}
