import { RootState } from '../store';

export const selectServerError = (state: RootState) => state.common.serverError;
