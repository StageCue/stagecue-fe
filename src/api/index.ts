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

let alertShown = false;

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const response = error?.response?.data?.error?.element;
    const code = response?.code?.value;
    // stagecue.auth.user-empty=로그인이 필요해요.
    // stagecue.login-user.not-authorized=권한이 없어요.
    // stagecue.login-user.user-role-missing=권한이 없어요.
    // stagecue.login-user.token-missing=권한이 없어요.
    const logoutOptions = ['stagecue.auth.user-empty', 'stagecue.login-user.token-missing'];

    if (logoutOptions?.includes(code)) {
      useSessionStore.getState().logoutSession();
    }

    const pathname = window.location.pathname;
    const userType = useSessionStore.getState().userType;

    if (pathname.startsWith('/biz')) {
      if (userType === 'TROUPE' && code === 'stagecue.login-user.not-authorized') {
        if (!alertShown) {
          alertShown = true;
          alert('극단주 승인 대기중입니다.');
          navigateTo('/biz/troupe');

          setTimeout(() => {
            alertShown = false;
          }, 3000);
        }
      }
    }

    // if (response.code.value === 'stagecue.troupe.not-found') {
    //   navigateTo('/biz/troupe');
    // }

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
      throw error;
    });
};

export default request;
