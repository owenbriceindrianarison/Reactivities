import { Grid } from 'semantic-ui-react';
import { ActivityList } from '../../features/activities/presenter/ActivityList';

export default function ActivityDashboardPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filter</h2>
      </Grid.Column>
    </Grid>
  );
}
