import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { closeActivityForm } from '../../activitySlice';
import { selectActivity } from '../../selectors';
import { Activity } from '../../model/activity';
import { createOrEditActivityAsync } from '../../actions.thunk';

export function ActivityForm() {
  const dispatch = useAppDispatch();
  const selectedActivity = useAppSelector(selectActivity);

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  function handleSubmit() {
    dispatch(createOrEditActivityAsync(activity));
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
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={() => dispatch(closeActivityForm())}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
