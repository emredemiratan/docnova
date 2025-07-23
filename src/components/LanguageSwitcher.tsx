import React from 'react';
import { Select } from 'antd';
import i18n from '../i18n';

const LanguageSwitcher: React.FC = () => {
   const handleChange = (lng: string) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
   };

   return (
      <Select
         defaultValue={i18n.language}
         style={{ width: 120 }}
         onChange={handleChange}
         options={[
            { value: 'tr', label: 'Türkçe' },
            { value: 'en', label: 'English' },
         ]}
      />
   );
};

export default LanguageSwitcher;
