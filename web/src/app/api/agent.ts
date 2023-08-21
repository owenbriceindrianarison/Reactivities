import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { router } from '../../router/Routes';
import { Activity } from '../../store/activities/model/activity';
import { setServerError } from '../../store/common/commonSlice';
import { store } from '../../store/store';
import { BASE_URL } from '../../utils/constants';
import { User, UserFormValues } from '../../store/user/model/user';

axios.defaults.baseURL = BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().userSlice.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          router.navigate('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error('bad request');
        }
        break;
      case 401:
        toast.error('unauthorized');
        break;
      case 403:
        toast.error('forbidden');
        break;
      case 404:
        router.navigate('/not-found');
        break;
      case 500:
        store.dispatch(setServerError({ error: data }));
        router.navigate('/server-error');
        break;
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/activities'),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity: Activity) =>
    requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) =>
    requests.post<User>('/account/register', user),
};

const agent = {
  Activities,
  Account,
};

export default agent;