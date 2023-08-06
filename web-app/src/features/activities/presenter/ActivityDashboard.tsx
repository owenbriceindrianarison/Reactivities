import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Grid } from 'semantic-ui-react';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from './ActivityDetails';
import { ActivityForm } from './form/ActivityForm';
import { selectActivity, selectEditMode } from '../selectors';
import { getActivitiesAsync } from '../actions.thunk';

export function ActivityDashboard() {
  const dispatch = useAppDispatch();
  const activity = useAppSelector(selectActivity);
  const editMode = useAppSelector(selectEditMode);

  useEffect(() => {
    dispatch(getActivitiesAsync());
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {activity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
}
