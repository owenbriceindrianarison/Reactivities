import { Button, Card, Image } from 'semantic-ui-react';
import { cancelSelectedActivity, openActivityForm } from '../activitySlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectActivity } from '../selectors';

export function ActivityDetails() {
  const dispatch = useAppDispatch();
  const activity = useAppSelector(selectActivity);

  if (!activity) return null;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => dispatch(openActivityForm({ activity }))}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => dispatch(cancelSelectedActivity())}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
