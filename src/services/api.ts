import axios from 'axios';
import { store } from '../redux/store';
import { toast } from 'react-toastify';
import i18n from '../i18n';

// Determine API base URL:
// - Prefer VITE_API_BASE_URL if provided at build time
// - Use '/api' only in dev to leverage Vite proxy
// - Fallback to public API URL in production if no env is set
const apiBaseUrl =
   (import.meta as any).env?.VITE_API_BASE_URL ??
   ((import.meta as any).env?.DEV ? '/api' : '/api/proxy');

const api = axios.create({
   baseURL: apiBaseUrl,
   headers: {
      'Content-Type': 'application/json',
   },
});

api.interceptors.request.use(
   (config) => {
      const token = store.getState().user.user?.jwt;
      if (token) {
         config.headers['R-Auth'] = token;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

api.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      console.error('API Error:', error);
      toast.error(error.response?.data?.message || i18n.t('login.sthWrong'));
      return Promise.reject(error);
   },
);

export default api;
