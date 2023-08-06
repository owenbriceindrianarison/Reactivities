import { AppThunk } from '../../app/store';
import { fetchActivities } from './activityAPI';
import {
  cancelSelectedActivity,
  setActivities,
  setEditMode,
  setSelectedActivity,
} from './activitySlice';
import { Activity } from './model/activity';

export const getActivitiesAsync = (): AppThunk => async (dispatch) => {
  const activities = await fetchActivities();

  dispatch(setActivities({ activities }));
};

export const createOrEditActivityAsync =
  (activity: Activity): AppThunk =>
  async (dispatch, getState) => {
    const activities = getState().activity.items;
    let newActivities: Activity[] = [];

    activity.id
      ? (newActivities = [
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : (newActivities = [...activities, activity]);

    dispatch(setActivities({ activities: newActivities }));
    dispatch(setEditMode(false));
    dispatch(setSelectedActivity({ activity }));
  };

export const deleteActivityAsync =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { items: activities, selectedActivity } = getState().activity;
    const newActivities: Activity[] = activities.filter((x) => x.id !== id);

    dispatch(setActivities({ activities: newActivities }));

    if (selectedActivity?.id === id) {
      console.log('ddddd');
      dispatch(cancelSelectedActivity());
    }
  };
