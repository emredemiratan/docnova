import React from 'react';
import { Form, Input, Button, Card, Typography, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login: React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { t } = useTranslation();

   const onFinish = async (values: { email: string; password: string }) => {
      try {
         const response = await api.post('/auth/login/dev', {
            email: values.email,
            password: values.password,
         });

         const user = response.data;
         dispatch(setUser(user));
         toast.success(t('login.success'));
         navigate('/invoice-list');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 64px)' }}>
         <Col xs={24}>
            <Card style={{ width: '100%', maxWidth: 400, margin: '0 auto', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
               <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <Title level={2}>{t('login.title')}</Title>
               </div>
               <Form name="login" layout="vertical" onFinish={onFinish}>
                  <Form.Item label={t('login.email')} name="email" rules={[{ required: true, message: t('login.emailRequired') }]}>
                     <Input prefix={<MailOutlined />} placeholder={t('login.email')} />
                  </Form.Item>

                  <Form.Item label={t('login.password')} name="password" rules={[{ required: true, message: t('login.passwordRequired') }]}>
                     <Input.Password prefix={<LockOutlined />} placeholder={t('login.password')} />
                  </Form.Item>

                  <Form.Item>
                     <Button type="primary" htmlType="submit" block>
                        {t('login.submit')}
                     </Button>
                  </Form.Item>
               </Form>
            </Card>
         </Col>
      </Row>
   );
};

export default Login;
