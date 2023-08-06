import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setSelectedActivity } from '../activitySlice';
import { Activity } from '../model/activity';
import { selectActivities } from '../selectors';
import { deleteActivityAsync } from '../actions.thunk';

export function ActivityList() {
  const dispatch = useAppDispatch();
  const activities = useAppSelector(selectActivities);

  function selectActivity(activity: Activity) {
    dispatch(setSelectedActivity({ activity }));
  }

  function deleteActivity(id: string) {
    dispatch(deleteActivityAsync(id));
  }

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
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={() => deleteActivity(activity.id)}
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
