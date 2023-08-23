import agent from '../../app/api/agent';
import { User, UserFormValues } from './model/user';

export async function loginRequest(
  user: UserFormValues
): Promise<User | undefined> {
  try {
    return await agent.Account.login(user);
  } catch (err) {
    console.log(err);
  }
}

export async function registerRequest(user: UserFormValues): Promise<User> {
  try {
    return await agent.Account.register(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getCurrentUserRequest(): Promise<User | undefined> {
  try {
    return await agent.Account.current();
  } catch (err) {
    console.log(err);
  }
}
