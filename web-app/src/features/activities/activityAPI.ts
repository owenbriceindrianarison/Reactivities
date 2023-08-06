import axios from 'axios';
import { Activity } from './model/activity';

export async function fetchActivities(): Promise<Activity[]> {
  const response = await axios.get<Activity[]>(
    'http://localhost:5000/api/activities'
  );

  return response.data;
}
