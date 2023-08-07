import { RootState } from '../../app/store';

export const selectActivities = (state: RootState) =>
  Array.from(state.activity.items).sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
export const selectActivity = (state: RootState) =>
  state.activity.selectedActivity;
// export const selectEditMode = (state: RootState) => state.activity.editMode;
export const selectCreatingStatus = (state: RootState) =>
  state.activity.creatingStatus;
export const selectDeletingStatus = (state: RootState) =>
  state.activity.deletingStatus;
export const selectStatus = (state: RootState) => state.activity.status;
