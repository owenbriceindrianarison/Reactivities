import { v4 as uuid } from 'uuid';

import { AppThunk } from '../store';
import {
  createActivityRequest,
  deleteActivityRequest,
  fetchActivitiesRequest,
  getActivityRequest,
  updateActivityRequest,
  updateAttendeeRequest,
} from './activityAPI';
import {
  cancelSelectedActivity,
  setActivities,
  setDeletingStatus,
  setSelectedActivity,
  setStatus,
  setCreatingStatus,
  updateAttendee,
} from './activitySlice';
import { Activity, ActivityFormValues } from './model/activity';
import { Profile } from './model/profile';

export const getActivitiesAsync =
  (): AppThunk => async (dispatch, getState) => {
    const user = getState().userSlice.user;
    const acitivitiesFormatted: Activity[] = [];

    const activities = await fetchActivitiesRequest();

    if (activities && activities.length > 0) {
      activities.forEach((activity) => {
        if (user) {
          activity.isGoing = activity.attendees!.some(
            (a) => a.username === user.username
          );
          activity.isHost = activity.hostUsername === user.username;
          activity.host = activity.attendees?.find(
            (x) => x.username === activity.hostUsername
          );
        }
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
  (activity: ActivityFormValues): AppThunk<Promise<Activity | undefined>> =>
  async (dispatch, getState) => {
    const user = getState().userSlice.user;
    const activities = getState().activitySlice.items;
    const attendee = new Profile(user!);

    if (activity.id) {
      await updateActivityRequest(activity);
      let activityUpdated = (await getActivityRequest(activity.id)) as Activity;
      activityUpdated!.date = new Date(activityUpdated!.date!);
      dispatch(
        setActivities({
          activities: [
            ...activities.filter((x) => x.id !== activity.id),
            activityUpdated as Activity,
          ],
        })
      );
      dispatch(setSelectedActivity({ activity: activityUpdated! }));

      return activityUpdated;
    }

    activity.id = uuid();

    await createActivityRequest(activity);
    const newActivity = new Activity(activity);
    newActivity.hostUsername = user!.username;
    newActivity.attendees = [attendee];

    dispatch(setActivities({ activities: [...activities, newActivity] }));
    dispatch(setSelectedActivity({ activity: newActivity }));

    return newActivity;
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

export const updateAttendeeAsync =
  (): AppThunk => async (dispatch, getState) => {
    const selectedActivity = getState().activitySlice.selectedActivity;
    const user = getState().userSlice.user;
    const activities = getState().activitySlice.items;

    console.log({ selectedActivity });
    try {
      await updateAttendeeRequest(selectedActivity!.id);

      dispatch(
        updateAttendee({
          user: user!,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

export const cancelActivityToggleAsync =
  (): AppThunk => async (dispatch, getState) => {
    const { items: activities, selectedActivity: activity } =
      getState().activitySlice;
    await updateAttendeeRequest(activity!.id);
    const newActivity = {
      ...activity,
      isCancelled: !activity!.isCancelled,
    } as Activity;
    dispatch(setSelectedActivity({ activity: newActivity }));
    dispatch(
      setActivities({
        activities: [
          ...activities.filter((x) => x.id !== newActivity.id),
          newActivity,
        ],
      })
    );
  };
