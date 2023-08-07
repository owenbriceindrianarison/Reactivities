import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Activity } from './model/activity';

export interface ActivityState {
  items: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  status: 'idle' | 'loading' | 'failed';
  createActivityStatus: boolean;
  deleteActivityStatus: boolean;
}

const initialState: ActivityState = {
  items: [],
  selectedActivity: undefined,
  editMode: false,
  status: 'idle',
  createActivityStatus: false,
  deleteActivityStatus: false,
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

    openActivityForm: (
      state,
      action: PayloadAction<{ activity?: Activity }>
    ) => {
      if (!action.payload?.activity && state.selectedActivity) {
        state.selectedActivity = undefined;
      }
      state.editMode = true;
    },

    closeActivityForm: (state) => {
      state.editMode = false;
    },

    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },

    setCreateActivityStatus: (state, action: PayloadAction<boolean>) => {
      state.createActivityStatus = action.payload;
    },

    setDeleteActivityStatus: (state, action: PayloadAction<boolean>) => {
      state.deleteActivityStatus = action.payload;
    },
  },
});

export const {
  setActivities,
  setSelectedActivity,
  cancelSelectedActivity,
  openActivityForm,
  closeActivityForm,
  setEditMode,
  setCreateActivityStatus,
  setDeleteActivityStatus,
} = activitySlice.actions;

export default activitySlice.reducer;
