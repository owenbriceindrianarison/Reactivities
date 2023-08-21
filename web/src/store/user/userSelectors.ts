import { RootState } from '../store';

export const selectUser = (state: RootState) => state.userSlice.user;

export const selectIsLoggedIn = (state: RootState) => !!state.userSlice.user;

export const selectToken = (state: RootState) => state.userSlice.token;
