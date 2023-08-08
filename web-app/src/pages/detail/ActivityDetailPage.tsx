import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectActivity,
  selectStatus,
} from '../../features/activities/selectors';
import { getActivityAsync } from '../../features/activities/actions.thunk';
import LoadingComponent from '../../components/LoadingComponent';

export default function ActivityDetailPage() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const activity = useAppSelector(selectActivity);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(getActivityAsync(id!));
  }, [id, dispatch]);

  if (status === 'loading' || !activity) return <LoadingComponent />;

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
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            as={Link}
            to='/activities'
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
