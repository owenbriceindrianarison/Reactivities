import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ServerError } from './model/serverError';

export interface CommonState {
  serverError: ServerError | null;
}

const initialState: CommonState = {
  serverError: null,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setServerError: (state, action: PayloadAction<{ error: ServerError }>) => {
      state.serverError = action.payload.error;
    },
  },
});

export const { setServerError } = commonSlice.actions;

export default commonSlice.reducer;
