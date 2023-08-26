import { RootState } from '../store';

export const selectProfile = (state: RootState) => state.profileSlice.profile;

export const selectStatus = (state: RootState) => state.profileSlice.status;

export const selectIsCurrentUser = (state: RootState) =>
  state.userSlice.user?.username === state.profileSlice.profile?.username;

export const selectUploadLoading = (state: RootState) =>
  state.profileSlice.uploadLoading;
