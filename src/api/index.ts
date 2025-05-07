import axios from 'axios';
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

// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     // const originalRequest = error.config;

//     // if (error?.response?.status === 401 && !originalRequest?._retry) {
//     //   originalRequest._retry = true;

//     //   if (refreshToken) {
//     //     try {
//     //       const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//     //         await requestRefreshSession(refreshToken);
//     //       sessionStorage.setItem('access_token', newAccessToken);
//     //       sessionStorage.setItem('refresh_token', newRefreshToken);
//     //       originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//     //       return apiClient(originalRequest);
//     //     } catch (refreshError) {
//     //       console.error('토큰 갱신 실패: ', refreshError);
//     //       window.location.href = '/login'; // 로그인 페이지로 이동
//     //     }
//     //   } else {
//     //     window.location.href = '/login';
//     //   }
//     // }

//     return Promise.reject(error);
//   }
// );

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
