import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
import { Photo, Profile } from './model/profile';
import { setImage } from '../user/userSlice';

export type StatusState = 'idle' | 'loading' | 'failed';

export interface ProfileState {
  profile: Profile | null;
  status: StatusState;
  uploadLoading: boolean;
}

const initialState: ProfileState = {
  profile: null,
  status: 'idle',
  uploadLoading: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },

    cleanProfile: (state) => {
      state.profile = null;
    },

    setStatus: (state, action: PayloadAction<StatusState>) => {
      state.status = action.payload;
    },

    addPhoto: (state, action: PayloadAction<{ photo: Photo }>) => {
      const { photo } = action.payload;
      state.profile?.photos?.push(photo);
      if (photo.isMain && store.getState().userSlice.user) {
        store.dispatch(setImage({ imageUrl: photo.url }));
        state.profile!.image = photo.url;
      }
    },

    setUploadLoadingToggle: (state) => {
      state.uploadLoading = !state.uploadLoading;
    },

    setMainProfile: (state, action: PayloadAction<{ photo: Photo }>) => {
      if (state.profile && state.profile.photos) {
        const photo = action.payload.photo;
        state.profile.photos.find((p) => p.isMain)!.isMain = false;
        state.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
        state.profile.image = photo.url;
      }
    },

    deleteImage: (state, action: PayloadAction<{ id: string }>) => {
      if (state.profile && state.profile.photos) {
        const id = action.payload.id;
        state.profile.photos = [
          ...state.profile.photos.filter((p) => p.id !== id),
        ];
      }
    },
  },
});

export const {
  setProfile,
  setStatus,
  cleanProfile,
  addPhoto,
  setUploadLoadingToggle,
  setMainProfile,
  deleteImage,
} = profileSlice.actions;

export default profileSlice.reducer;
