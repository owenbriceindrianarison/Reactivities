import { format } from 'date-fns';
import { RootState } from '../store';
import { Activity } from './model/activity';

// export const selectActivities = (state: RootState) =>
//   Array.from(state.activitySlice.items).sort(
//     (a, b) => a.date!.getTime() - b.date!.getTime()
//   );

export const selectActivity = (state: RootState) =>
  state.activitySlice.selectedActivity;

export const selectCreatingStatus = (state: RootState) =>
  state.activitySlice.creatingStatus;

export const selectDeletingStatus = (state: RootState) =>
  state.activitySlice.deletingStatus;

export const selectStatus = (state: RootState) => state.activitySlice.status;

export const selectGroupedActivities = (state: RootState) => {
  const activitiesByDate = Array.from(state.activitySlice.items).sort(
    (a, b) => a.date!.getTime() - b.date!.getTime()
  );

  return Object.entries(
    activitiesByDate.reduce((activities, activity) => {
      const date = format(activity.date!, 'dd MMM yyyy');
      activities[date] = activities[date]
        ? [...activities[date], activity]
        : [activity];

      return activities;
    }, {} as { [key: string]: Activity[] })
  );
};
