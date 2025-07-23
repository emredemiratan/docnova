import React from 'react';
import { Layout, Menu, Button, Switch, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { logoutUser } from '../redux/slices/userSlice';
import { toggleTheme } from '../redux/slices/themeSlice';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector((state: RootState) => state.user.user);
   const { mode } = useSelector((state: RootState) => state.theme);

   const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/login');
   };

   return (
      <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         {user ? (
            <>
               <Menu theme={mode} mode="horizontal" defaultSelectedKeys={['home']} style={{ flex: 1, borderBottom: 'none', background: 'transparent' }}>
                  <Menu.Item key="home">
                     <Link to="/">{t('header.home')}</Link>
                  </Menu.Item>
               </Menu>
               <Space align="center">
                  <Switch
                     checkedChildren={<SunOutlined />}
                     unCheckedChildren={<MoonOutlined />}
                     checked={mode === 'light'}
                     onChange={() => dispatch(toggleTheme())}
                  />
                  <LanguageSwitcher />
                  <Button type="primary" onClick={handleLogout}>
                     {t('header.logout')}
                  </Button>
               </Space>
            </>
         ) : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
               <Space align="center">
                  <Switch
                     checkedChildren={<SunOutlined />}
                     unCheckedChildren={<MoonOutlined />}
                     checked={mode === 'light'}
                     onChange={() => dispatch(toggleTheme())}
                  />
                  <LanguageSwitcher />
               </Space>
            </div>
         )}
      </AntHeader>
   );
};

export default Header; 