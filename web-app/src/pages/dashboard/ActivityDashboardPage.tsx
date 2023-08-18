import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { ActivityList } from '../../components/activities/list/ActivityList';
import { ActivityFilters } from '../../components/activities/filters/ActivityFilters';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getActivitiesAsync } from '../../store/activities/activityActions.thunk';
import { selectGroupedActivities } from '../../store/activities/activitySelectors';

export default function ActivityDashboardPage() {
  const dispatch = useAppDispatch();
  const groupedActivities = useAppSelector(selectGroupedActivities);

  useEffect(() => {
    dispatch(getActivitiesAsync());
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList groupedActivities={groupedActivities} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}
