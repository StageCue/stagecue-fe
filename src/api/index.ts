import axios from 'axios';
import useSessionStore from '@/store/session';
import { navigateTo } from '@/utils/navigator';

interface RequestPrams {
  method: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  data?: object;
  header?: { [key: string]: string };
  params?: object;
}

const apiClient = axios.create({
  baseURL: '/api/v1/',
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const response = error?.response?.data?.error?.element;
    // stagecue.auth.user-empty=로그인이 필요해요.
    // stagecue.login-user.not-authorized=권한이 없어요.
    // stagecue.login-user.user-role-missing=권한이 없어요.
    // stagecue.login-user.token-missing=권한이 없어요.
    const logoutOptions = [
      'stagecue.auth.user-empty',
      'stagecue.login-user.not-authorized',
      'stagecue.login-user.user-role-missing',
      'stagecue.login-user.token-missing',
    ];

    if (logoutOptions?.includes(response?.code?.value)) {
      useSessionStore.getState().logoutSession();
      useSessionStore.persist.clearStorage();
      window.location.href = '/auth/login';
    }

    if (response.code.value === 'stagecue.troupe.not-found') {
      console.log('response', response.code.value);
      navigateTo('/biz/troupe');
    }

    return Promise.reject(error);
  }
);

const request = async ({ method, endpoint, data, header = {}, params }: RequestPrams) => {
  const url = `${endpoint}`;

  return await apiClient({
    params,
    method,
    url,
    data,
    withCredentials: true,
    headers: {
      'Content-Type': header['Content-Type'] || 'application/json',
      ...header,
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error?.response?.data;
    });
};

export default request;
