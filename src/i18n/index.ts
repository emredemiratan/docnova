import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import tr from './tr.json';

const storedLang = localStorage.getItem('language');

i18n.use(initReactI18next).init({
   resources: {
      en: { translation: en },
      tr: { translation: tr },
   },
   lng: storedLang || 'tr',
   fallbackLng: 'en',
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;
