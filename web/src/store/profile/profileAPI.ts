import agent from '../../app/api/agent';
import { Photo, Profile } from './model/profile';

export async function loadProfileRequest(
  username: string
): Promise<Profile | undefined> {
  try {
    return await agent.Profile.get(username);
  } catch (err) {
    console.log(err);
  }
}

export async function uploadPhotoRequest(
  file: Blob
): Promise<Photo | undefined> {
  try {
    const response = await agent.Profile.uploadPhoto(file);

    return response?.data;
  } catch (err) {
    console.log(err);
  }
}

export async function setMainPhotoRequest(id: string) {
  try {
    await agent.Profile.setMainPhoto(id);
  } catch (err) {
    console.log(err);
  }
}

export async function deletePhotoRequest(id: string) {
  try {
    await agent.Profile.deletePhoto(id);
  } catch (err) {
    console.log(err);
  }
}
