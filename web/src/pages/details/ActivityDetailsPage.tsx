import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectActivity,
  selectStatus,
} from '../../store/activities/activitySelectors';
import { getActivityAsync } from '../../store/activities/activityActions.thunk';
import LoadingComponent from '../../components/LoadingComponent';
import { ActivityDetailedSidebar } from '../../components/activities/details/ActivityDetailedSidebar';
import { ActivityDetailedHeader } from '../../components/activities/details/ActivityDetailedHeader';
import { ActivityDetailedInfo } from '../../components/activities/details/ActivityDetailedInfo';
import { ActivityDetailedChat } from '../../components/activities/details/ActivityDetailedChat';

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
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
}
