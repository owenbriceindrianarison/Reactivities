import { RootState } from '../../app/store';

export const selectActivities = (state: RootState) => state.activity.items;
export const selectActivity = (state: RootState) =>
  state.activity.selectedActivity;
export const selectEditMode = (state: RootState) => state.activity.editMode;
