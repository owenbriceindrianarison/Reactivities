import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  open: boolean;
  body: JSX.Element | null;
}

const initialState: ModalState = {
  open: false,
  body: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<JSX.Element>) => {
      state.open = true;
      state.body = action.payload;
    },

    close: (state) => {
      state.open = false;
      state.body = null;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
