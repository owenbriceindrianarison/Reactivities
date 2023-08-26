/// <reference types="redux-persist" />
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import activityReducer from './activities/activitySlice';
import commonReducer from './common/commonSlice';
import userReducer from './user/userSlice';
import modalReducer from './modal/modalSlice';
import profileReducer from './profile/profileSlice';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  commonSlice: commonReducer,
  userSlice: userReducer,
  activitySlice: activityReducer,
  modalSlice: modalReducer,
  profileSlice: profileReducer,
});

const persistConfig = {
  key: 'user',
  storage: storageSession,
  whitelist: ['userSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
