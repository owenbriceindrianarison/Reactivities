import { RootState } from '../store';

export const selectModal = (state: RootState) => ({
  open: state.modalSlice.open,
  body: state.modalSlice.body,
});
