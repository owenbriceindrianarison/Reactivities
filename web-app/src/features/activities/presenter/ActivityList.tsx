import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectActivities, selectDeletingStatus } from '../selectors';
import { deleteActivityAsync, getActivitiesAsync } from '../actions.thunk';
import { SyntheticEvent, useEffect, useState } from 'react';

export function ActivityList() {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(selectActivities);
  const deletingStatus = useAppSelector(selectDeletingStatus);

  const [target, setTarget] = useState('');

  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    dispatch(deleteActivityAsync(id));
  }

  useEffect(() => {
    dispatch(getActivitiesAsync());
  }, [dispatch]);

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={`/activities/${activity.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={activity.id}
                  loading={
                    deletingStatus === 'loading' && target === activity.id
                  }
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={(event) => handleActivityDelete(event, activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
