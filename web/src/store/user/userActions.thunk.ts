import { AppThunk } from '../store';
import { UserFormValues } from './model/user';
import {
  getCurrentUserRequest,
  loginRequest,
  registerRequest,
} from './userAPI';
import { login, logout } from './userSlice';
import { User as UserModel } from './model/user';
import { close } from '../modal/modalSlice';

export const loginUserAsync =
  (userValues: UserFormValues): AppThunk<Promise<UserModel | undefined>> =>
  async (dispatch) => {
    const user = await loginRequest(userValues);
    if (user) {
      dispatch(login(user));
      dispatch(close());
    }

    return user;
  };

export const registerUserAsync =
  (userValues: UserFormValues): AppThunk<Promise<UserModel>> =>
  async (dispatch) => {
    const user = await registerRequest(userValues);
    if (user) {
      dispatch(login(user));
      dispatch(close());
    }

    return user;
  };

export const getCurrentUserAsync = (): AppThunk => async (dispatch) => {
  const user = await getCurrentUserRequest();
  if (user) {
    dispatch(login(user));

    return;
  }

  dispatch(logout());
};
