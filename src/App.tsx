// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import Login from './pages/Login';
import InvoiceList from './pages/InvoiceList';
import InvoiceDetail from './pages/InvoiceDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, ConfigProvider, theme } from 'antd';

const { Content } = Layout;

const App: React.FC = () => {
   const user = useSelector((state: RootState) => state.user.user);
   const { mode } = useSelector((state: RootState) => state.theme);

   return (
      <ConfigProvider
         theme={{
            algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
         }}
      >
         <Router>
            <Layout style={{ minHeight: '100vh' }}>
               <Header />
               <Content style={{ padding: '0 50px' }}>
                  <ToastContainer theme={mode} />
                  <Routes>
                     <Route path="/" element={user ? <Navigate to="/invoice-list" /> : <Navigate to="/login" />} />
                     <Route path="/login" element={user ? <Navigate to="/invoice-list" /> : <Login />} />
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
               </Content>
            </Layout>
         </Router>
      </ConfigProvider>
   );
};

export default App;
