import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from './model/user';
import { router } from '../../router/Routes';

export interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.token = action.payload.token;
      router.navigate('/activities');
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      router.navigate('/');
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },

    setImage: (state, action: PayloadAction<{ imageUrl: string }>) => {
      if (state.user) state.user.image = action.payload.imageUrl;
    },
  },
});

export const { login, logout, setUser, setImage } = userSlice.actions;

export default userSlice.reducer;
