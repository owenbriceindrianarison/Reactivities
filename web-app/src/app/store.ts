import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import activityReducer from '../features/activities/activitySlice';

export const store = configureStore({
  reducer: {
    activity: activityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
