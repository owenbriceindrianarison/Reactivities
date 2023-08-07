import { v4 as uuid } from 'uuid';

import { AppThunk } from '../../app/store';
import {
  createActivity,
  deleteActivity,
  fetchActivities,
  getActivity,
  updateActivity,
} from './activityAPI';
import {
  cancelSelectedActivity,
  setActivities,
  setDeletingStatus,
  setSelectedActivity,
  setStatus,
  setCreatingStatus,
} from './activitySlice';
import { Activity } from './model/activity';

export const getActivitiesAsync = (): AppThunk => async (dispatch) => {
  const activities = await fetchActivities();
  const acitivitiesFormatted: Activity[] = [];
  activities.forEach((activity) => {
    activity.date = activity.date.split('T')[0];
    acitivitiesFormatted.push(activity);
  });
  dispatch(setActivities({ activities: acitivitiesFormatted }));
};

export const getActivityAsync =
  (id: string): AppThunk<Promise<Activity | undefined>> =>
  async (dispatch, getState) => {
    const activities = getState().activity.items;
    let activity = activities.find((x) => x.id === id);
    if (activity) {
      dispatch(setSelectedActivity({ activity }));

      return activity;
    } else {
      dispatch(setStatus('loading'));

      try {
        activity = await getActivity(id);
        dispatch(setSelectedActivity({ activity }));
        dispatch(setStatus('idle'));

        return activity;
      } catch (err) {
        dispatch(setStatus('failed'));
        console.log(err);
      }
    }

    return undefined;
  };

export const createOrEditActivityAsync =
  (activity: Activity): AppThunk<Promise<Activity | undefined>> =>
  async (dispatch, getState) => {
    const activities = getState().activity.items;

    dispatch(setCreatingStatus('loading'));
    if (activity.id) {
      try {
        await updateActivity(activity);

        dispatch(
          setActivities({
            activities: [
              ...activities.filter((x) => x.id !== activity.id),
              activity,
            ],
          })
        );
        dispatch(setCreatingStatus('idle'));
        dispatch(setSelectedActivity({ activity }));

        return activity;
      } catch (err) {
        dispatch(setCreatingStatus('failed'));
        console.log(err);
      }
    } else {
      activity.id = uuid();

      try {
        await createActivity(activity);
        dispatch(setActivities({ activities: [...activities, activity] }));
        dispatch(setCreatingStatus('idle'));
        dispatch(setSelectedActivity({ activity }));

        return activity;
      } catch (err) {
        console.log(err);
        dispatch(setCreatingStatus('failed'));
      }
    }

    return;
  };

export const deleteActivityAsync =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { items: activities, selectedActivity } = getState().activity;

    dispatch(setDeletingStatus('loading'));

    try {
      await deleteActivity(id);

      dispatch(setDeletingStatus('idle'));
      dispatch(
        setActivities({
          activities: [...activities.filter((x) => x.id !== id)],
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(setDeletingStatus('failed'));
    }

    if (selectedActivity?.id === id) {
      dispatch(cancelSelectedActivity());
    }
  };
