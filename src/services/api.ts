import axios from 'axios';
import { store } from '../redux/store';
import { toast } from 'react-toastify';
import i18n from '../i18n';

const api = axios.create({
   baseURL: '/api',
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
