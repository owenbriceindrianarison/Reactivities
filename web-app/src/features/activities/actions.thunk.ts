import { v4 as uuid } from 'uuid';
import agent from '../../app/api/agent';
import { AppThunk } from '../../app/store';
import { fetchActivities } from './activityAPI';
import {
  cancelSelectedActivity,
  setActivities,
  setDeleteActivityStatus,
  setEditMode,
  setSelectedActivity,
  setCreateActivityStatus,
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

    dispatch(setCreateActivityStatus(true));
    if (activity.id) {
      await agent.Activities.update(activity);
      dispatch(
        setActivities({
          activities: [
            ...activities.filter((x) => x.id !== activity.id),
            activity,
          ],
        })
      );
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity);
      dispatch(setActivities({ activities: [...activities, activity] }));
    }
    dispatch(setCreateActivityStatus(false));
    dispatch(setSelectedActivity({ activity }));
    dispatch(setEditMode(false));
  };

export const deleteActivityAsync =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const { items: activities, selectedActivity } = getState().activity;

    dispatch(setDeleteActivityStatus(true));
    await agent.Activities.delete(id);
    dispatch(setDeleteActivityStatus(false));
    dispatch(
      setActivities({ activities: [...activities.filter((x) => x.id !== id)] })
    );

    if (selectedActivity?.id === id) {
      dispatch(cancelSelectedActivity());
    }
  };
