import { RootState } from '../../app/store';

export const selectActivities = (state: RootState) => state.activity.items;
export const selectActivity = (state: RootState) =>
  state.activity.selectedActivity;
export const selectEditMode = (state: RootState) => state.activity.editMode;
export const selectCreateActivityStatus = (state: RootState) =>
  state.activity.createActivityStatus;
export const selectDeleteActivityStatus = (state: RootState) =>
  state.activity.deleteActivityStatus;
