import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedActivity } from '../activitySlice';
import { Activity } from '../model/activity';
import { selectActivities, selectDeleteActivityStatus } from '../selectors';
import { deleteActivityAsync, getActivitiesAsync } from '../actions.thunk';
import { SyntheticEvent, useEffect, useState } from 'react';

export function ActivityList() {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(selectActivities);
  const deleteActivityStatus = useAppSelector(selectDeleteActivityStatus);

  const [target, setTarget] = useState('');

  function selectActivity(activity: Activity) {
    dispatch(setSelectedActivity({ activity }));
  }

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
                  floated='right'
                  content='View'
                  color='blue'
                  onClick={() => selectActivity(activity)}
                />
                <Button
                  name={activity.id}
                  loading={deleteActivityStatus && target === activity.id}
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
