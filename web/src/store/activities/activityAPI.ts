import agent from '../../app/api/agent';
import { Activity, ActivityFormValues } from './model/activity';

export async function fetchActivitiesRequest(): Promise<
  Activity[] | undefined
> {
  try {
    return await agent.Activities.list();
  } catch (err) {
    console.log(err);
  }
}

export async function getActivityRequest(
  id: string
): Promise<Activity | undefined> {
  try {
    const response = await agent.Activities.details(id);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function createActivityRequest(activity: ActivityFormValues) {
  try {
    await agent.Activities.create(activity);
  } catch (err) {
    console.log(err);
  }
}

export async function updateActivityRequest(activity: ActivityFormValues) {
  try {
    await agent.Activities.update(activity);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteActivityRequest(id: string) {
  try {
    await agent.Activities.delete(id);
  } catch (err) {
    console.log(err);
  }
}

export async function updateAttendeeRequest(id: string) {
  try {
    await agent.Activities.attend(id);
  } catch (err) {
    console.log(err);
  }
}
