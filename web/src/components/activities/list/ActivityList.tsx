import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { ActivityListItem } from './ActivityListItem';
import { Activity } from '../../../store/activities/model/activity';

interface Props {
  groupedActivities: [string, Activity[]][];
}

export function ActivityList({ groupedActivities }: Props) {
  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
