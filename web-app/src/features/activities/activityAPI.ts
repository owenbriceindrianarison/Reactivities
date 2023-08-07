import agent from '../../app/api/agent';
import { Activity } from './model/activity';

export async function fetchActivities(): Promise<Activity[]> {
  const response = await agent.Activities.list();

  return response;
}

export async function getActivity(id: string): Promise<Activity> {
  const response = await agent.Activities.details(id);

  return response;
}

export async function createActivity(activity: Activity) {
  await agent.Activities.create(activity);
}

export async function updateActivity(activity: Activity) {
  await agent.Activities.update(activity);
}

export async function deleteActivity(id: string) {
  await agent.Activities.delete(id);
}
