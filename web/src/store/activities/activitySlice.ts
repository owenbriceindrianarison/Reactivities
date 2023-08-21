import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Activity } from './model/activity';

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
  },
});

export const {
  setActivities,
  setSelectedActivity,
  cancelSelectedActivity,
  setCreatingStatus,
  setDeletingStatus,
  setStatus,
} = activitySlice.actions;

export default activitySlice.reducer;
