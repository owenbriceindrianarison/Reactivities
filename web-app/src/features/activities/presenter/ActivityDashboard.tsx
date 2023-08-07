import { useAppSelector } from '../../../app/hooks';
import { Grid } from 'semantic-ui-react';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from './ActivityDetails';
import { ActivityForm } from './form/ActivityForm';
import { selectActivity, selectEditMode } from '../selectors';

export function ActivityDashboard() {
  const activity = useAppSelector(selectActivity);
  const editMode = useAppSelector(selectEditMode);

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
