// App.tsx
import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
const Login = lazy(() => import('./pages/Login'));
const InvoiceList = lazy(() => import('./pages/InvoiceList'));
const InvoiceDetail = lazy(() => import('./pages/InvoiceDetail'));
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, ConfigProvider, theme, Spin } from 'antd';

const { Content } = Layout;

const App: React.FC = () => {
   const user = useSelector((state: RootState) => state.user.user);
   const { mode } = useSelector((state: RootState) => state.theme);

   useEffect(() => {
      const backgroundColor = mode === 'dark' ? '#141414' : '#ffffff';
      document.documentElement.style.backgroundColor = backgroundColor;
      document.body.style.backgroundColor = backgroundColor;
      const rootEl = document.getElementById('root');
      if (rootEl) {
         rootEl.style.backgroundColor = backgroundColor;
      }
   }, [mode]);

   return (
      <ConfigProvider
         theme={{
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
         }}
      >
         <Router>
            <Layout style={{ minHeight: '100vh' }}>
               <Header />
               <Content className="app-content">
                  <ToastContainer theme={mode} />
                  <Suspense
                     fallback={
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
                           <Spin size="large" />
                        </div>
                     }
                  >
                     <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                           path="/invoice-list"
                           element={
                              <ProtectedRoute>
                                 <InvoiceList />
                              </ProtectedRoute>
                           }
                        />
                        <Route
                           path="/invoice-detail/:id"
                           element={
                              <ProtectedRoute>
                                 <InvoiceDetail />
                              </ProtectedRoute>
                           }
                        />
                     </Routes>
                  </Suspense>
               </Content>
            </Layout>
         </Router>
      </ConfigProvider>
   );
};

export default App;
