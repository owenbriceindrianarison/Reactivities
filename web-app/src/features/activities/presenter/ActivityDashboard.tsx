import { Grid } from 'semantic-ui-react';
import { ActivityList } from './ActivityList';

export function ActivityDashboard() {
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
