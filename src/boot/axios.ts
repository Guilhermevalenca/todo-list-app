import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'x-apollo-operation-name': 'apollo-require-preflight',
  },
});

if (localStorage.getItem('token')) {
  api.defaults.headers.common['Authorization'] =
    `Bearer ${localStorage.getItem('token')}`;
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;
});

export { api };
