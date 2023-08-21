import { v4 as uuid } from 'uuid';

import { AppThunk } from '../store';
import {
  createActivityRequest,
  deleteActivityRequest,
  fetchActivitiesRequest,
  getActivityRequest,
  updateActivityRequest,
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
  const acitivitiesFormatted: Activity[] = [];

  const activities = await fetchActivitiesRequest();

  if (activities && activities.length > 0) {
    activities.forEach((activity) => {
      activity.date = new Date(activity.date!);
      acitivitiesFormatted.push(activity);
    });
  }

  dispatch(setActivities({ activities: acitivitiesFormatted }));
};

export const getActivityAsync =
  (id: string): AppThunk<Promise<Activity | undefined>> =>
  async (dispatch, getState) => {
    const activities = getState().activitySlice.items;

    if (activities.length > 0) {
      let activity = activities.find((x) => x.id === id);
      if (activity) {
        dispatch(setSelectedActivity({ activity }));

        return activity;
      } else {
        dispatch(setStatus('loading'));

        activity = await getActivityRequest(id);

        if (activity) {
          dispatch(setSelectedActivity({ activity }));
          dispatch(setStatus('idle'));

          return activity;
        }
      }
    }

    return undefined;
  };

export const createOrEditActivityAsync =
  (activity: Activity): AppThunk<Promise<Activity | undefined>> =>
  async (dispatch, getState) => {
    const activities = getState().activitySlice.items;

    dispatch(setCreatingStatus('loading'));
    if (activity.id) {
      await updateActivityRequest(activity);

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
    }

    activity.id = uuid();

    await createActivityRequest(activity);
    dispatch(setActivities({ activities: [...activities, activity] }));
    dispatch(setCreatingStatus('idle'));
    dispatch(setSelectedActivity({ activity }));

    return activity;
  };

export const deleteActivityAsync =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { items: activities, selectedActivity } = getState().activitySlice;

    dispatch(setDeletingStatus('loading'));

    await deleteActivityRequest(id);

    dispatch(setDeletingStatus('idle'));
    dispatch(
      setActivities({
        activities: [...activities.filter((x) => x.id !== id)],
      })
    );

    if (selectedActivity?.id === id) {
      dispatch(cancelSelectedActivity());
    }
  };
