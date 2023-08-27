import { RootState } from '../store';

export const selectComments = (state: RootState) => state.commentSlice.comments;
