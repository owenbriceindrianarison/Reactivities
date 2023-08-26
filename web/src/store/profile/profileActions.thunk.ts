import { AppThunk } from '../store';
import { setImage } from '../user/userSlice';
import { Photo } from './model/profile';
import {
  deletePhotoRequest,
  loadProfileRequest,
  setMainPhotoRequest,
  uploadPhotoRequest,
} from './profileAPI';
import {
  setProfile,
  setStatus,
  cleanProfile,
  addPhoto,
  setUploadLoadingToggle,
  setMainProfile,
  deleteImage,
} from './profileSlice';

export const loadProfilesAsync =
  (username: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus('loading'));

    const profile = await loadProfileRequest(username);
    profile ? dispatch(setProfile(profile)) : dispatch(cleanProfile());

    dispatch(setStatus('idle'));
  };

export const uploadPhotoAsync =
  (file: Blob): AppThunk<Promise<Photo | undefined>> =>
  async (dispatch) => {
    dispatch(setUploadLoadingToggle());

    const photo = await uploadPhotoRequest(file);
    if (photo) dispatch(addPhoto({ photo }));

    dispatch(setUploadLoadingToggle());

    return photo;
  };

export const setMainPhotoAsync =
  (photo: Photo): AppThunk =>
  async (dispatch) => {
    dispatch(setUploadLoadingToggle());
    await setMainPhotoRequest(photo.id);
    dispatch(setImage({ imageUrl: photo.url }));
    dispatch(setMainProfile({ photo }));
    dispatch(setUploadLoadingToggle());
  };

export const deletePhotoAsync =
  (photo: Photo): AppThunk =>
  async (dispatch) => {
    dispatch(setUploadLoadingToggle());
    await deletePhotoRequest(photo.id);
    dispatch(deleteImage({ id: photo.id }));
    dispatch(setUploadLoadingToggle());
  };
