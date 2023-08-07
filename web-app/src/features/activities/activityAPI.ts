import agent from '../../app/api/agent';
import { Activity } from './model/activity';

export async function fetchActivities(): Promise<Activity[]> {
  const response = await agent.Activities.list();

  return response;
}
