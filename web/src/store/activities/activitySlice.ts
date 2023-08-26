import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Activity } from './model/activity';
import { User } from '../user/model/user';
import { Profile } from '../profile/model/profile';

export type StatusState = 'idle' | 'loading' | 'failed';
export interface ActivityState {
  items: Activity[];
  selectedActivity: Activity | undefined;
  status: StatusState;
  creatingStatus: StatusState;
  deletingStatus: StatusState;
}

const initialState: ActivityState = {
  items: [],
  selectedActivity: undefined,
  status: 'idle',
  creatingStatus: 'idle',
  deletingStatus: 'idle',
};

export const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setActivities: (
      state,
      action: PayloadAction<{ activities: Activity[] }>
    ) => {
      state.items = [...action.payload.activities];
    },

    setSelectedActivity: (
      state,
      action: PayloadAction<{ activity: Activity }>
    ) => {
      state.selectedActivity = action.payload.activity;
    },

    cancelSelectedActivity: (state) => {
      state.selectedActivity = undefined;
    },

    setStatus: (state, action: PayloadAction<StatusState>) => {
      state.status = action.payload;
    },

    setCreatingStatus: (state, action: PayloadAction<StatusState>) => {
      state.creatingStatus = action.payload;
    },

    setDeletingStatus: (state, action: PayloadAction<StatusState>) => {
      state.deletingStatus = action.payload;
    },

    updateAttendee: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => {
      if (state.selectedActivity?.isGoing) {
        state.selectedActivity!.attendees =
          state.selectedActivity?.attendees?.filter(
            (a) => a.username !== action.payload.user?.username
          );
        state.selectedActivity!.isGoing = false;
      } else {
        const attendee = new Profile(action.payload.user!);
        state.selectedActivity?.attendees?.push(attendee);
        state.selectedActivity!.isGoing = true;
      }
      const updatedActivities: Activity[] = state.items.map((x) => {
        if (x.id === state.selectedActivity?.id) return state.selectedActivity;

        return x;
      });
      state.items = updatedActivities;
    },
  },
});

export const {
  setActivities,
  setSelectedActivity,
  cancelSelectedActivity,
  setCreatingStatus,
  setDeletingStatus,
  setStatus,
  updateAttendee,
} = activitySlice.actions;

export default activitySlice.reducer;
