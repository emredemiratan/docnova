import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { Descriptions, Card, Alert, Button, Row, Col, Typography, Tag, Space, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInvoices, setSelectedInvoice } from '../redux/slices/invoiceSlice';
import { ArrowLeftOutlined, UserOutlined, HomeOutlined, EuroCircleOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const InvoiceDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const { t } = useTranslation();

   const { invoices, selectedInvoice, loading, error } = useSelector((state: RootState) => state.invoice);

   useEffect(() => {
      if (invoices.length === 0 && loading === 'idle') {
         dispatch(fetchInvoices());
      }
   }, [dispatch, invoices.length, loading]);

   useEffect(() => {
      if (id && invoices.length > 0) {
         const invoiceFromState = invoices.find((inv) => inv.id === id);
         dispatch(setSelectedInvoice(invoiceFromState || null));
      }

      return () => {
         dispatch(setSelectedInvoice(null));
      };
   }, [id, dispatch, invoices]);

   if (loading === 'pending') {
      return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
            <Spin size="large" />
         </div>
      );
   }

   if (error) {
      return (
         <div style={{ padding: '50px' }}>
            <Alert message={t('global.error')} description={error} type="error" showIcon />
         </div>
      );
   }

   if (!selectedInvoice) {
      return (
         <div style={{ padding: '50px', textAlign: 'center' }}>
            <Alert message={t('invoiceDetail.notFound')} type="warning" showIcon />
            <Button type="primary" onClick={() => navigate('/invoice-list')} style={{ marginTop: 20 }}>
               <ArrowLeftOutlined /> {t('invoiceDetail.goBack')}
            </Button>
         </div>
      );
   }

   const invoice = selectedInvoice;

   const getStatusTag = (status: string) => {
      switch (status?.toUpperCase()) {
         case 'PAID':
         case 'SENT':
            return <Tag color="green">{t(`invoiceDetail.status.${status?.toLowerCase()}`)}</Tag>;
         case 'PENDING':
            return <Tag color="orange">{t(`invoiceDetail.status.${status?.toLowerCase()}`)}</Tag>;
         case 'LATE':
            return <Tag color="red">{t(`invoiceDetail.status.${status?.toLowerCase()}`)}</Tag>;
         default:
            return <Tag>{status}</Tag>;
      }
   };

   return (
      <div style={{ padding: '24px' }}>
         <Button onClick={() => navigate('/invoice-list')} type="link" icon={<ArrowLeftOutlined />} style={{ marginBottom: '16px', paddingLeft: 0 }}>
            {t('invoiceDetail.goBack')}
         </Button>

         <Card style={{ marginBottom: '24px' }}>
            <Row justify="space-between" align="middle">
               <Col>
                  <Title level={3} style={{ margin: 0 }}>
                     {t('invoiceDetail.invoice')} #{invoice.invoiceNumber}
                  </Title>
                  <Space direction="vertical">
                     <Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {t('invoiceDetail.issueDate')}: {dayjs(invoice.issueDate).format('YYYY-MM-DD')}
                     </Text>
                     <Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {t('invoiceDetail.dueDate')}: {dayjs(invoice.dueDate).format('YYYY-MM-DD')}
                     </Text>
                  </Space>
               </Col>
               <Col>{getStatusTag(invoice.paymentDetails?.paymentStatus || invoice.status)}</Col>
            </Row>
         </Card>

         <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
               <Card
                  title={
                     <span>
                        <UserOutlined /> {t('invoiceDetail.supplierInfo')}
                     </span>
                  }
                  style={{ height: '100%' }}
               >
                  <Descriptions column={1} bordered>
                     <Descriptions.Item label={t('invoiceDetail.supplierName')}>{invoice.supplierName}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.supplierVat')}>{invoice.supplierVat}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.supplierId')}>{invoice.supplierId}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.supplierCountryCode')}>{invoice.supplierCountryCode}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.supplierEndpoint')}>{invoice.supplierEndpoint}</Descriptions.Item>
                  </Descriptions>
               </Card>
            </Col>
            <Col xs={24} lg={12}>
               <Card
                  title={
                     <span>
                        <HomeOutlined /> {t('invoiceDetail.customerInfo')}
                     </span>
                  }
                  style={{ height: '100%' }}
               >
                  <Descriptions column={1} bordered>
                     <Descriptions.Item label={t('invoiceDetail.customerName')}>{invoice.customerName}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.customerVat')}>{invoice.customerVat}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.customerId')}>{invoice.customerId}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.customerCountryCode')}>{invoice.customerCountryCode}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.customerEndpoint')}>{invoice.customerEndpoint}</Descriptions.Item>
                  </Descriptions>
               </Card>
            </Col>

            <Col xs={24} lg={12}>
               <Card
                  title={
                     <span>
                        <InfoCircleOutlined /> {t('invoiceDetail.invoiceInfo')}
                     </span>
                  }
                  style={{ height: '100%' }}
               >
                  <Descriptions column={1} bordered>
                     <Descriptions.Item label={t('invoiceDetail.status')}>{invoice.status}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.documentType')}>{invoice.documentType}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.type')}>{invoice.type}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.typeCode')}>{invoice.typeCode}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.source')}>{invoice.source}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.sendViaPeppol')}>{invoice.sendViaPeppol ? t('global.yes') : t('global.no')}</Descriptions.Item>
                  </Descriptions>
               </Card>
            </Col>
            <Col xs={24} lg={12}>
               <Card
                  title={
                     <span>
                        <EuroCircleOutlined /> {t('invoiceDetail.paymentDetails')}
                     </span>
                  }
                  style={{ height: '100%' }}
               >
                  <Descriptions column={1} bordered>
                     <Descriptions.Item label={t('invoiceDetail.payableAmount')}>{`${invoice.payableAmount ?? '-'} ${invoice.currency}`}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.taxInclusiveAmount')}>{`${invoice.taxInclusiveAmount ?? '-'} ${
                        invoice.currency
                     }`}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.taxExclusiveAmount')}>{`${invoice.taxExclusiveAmount ?? '-'} ${
                        invoice.currency
                     }`}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.paidAmount')}>{`${invoice.paymentDetails?.paidAmount ?? '-'} ${
                        invoice.currency
                     }`}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.remainingAmount')}>{`${invoice.paymentDetails?.remainingAmount ?? '-'} ${
                        invoice.currency
                     }`}</Descriptions.Item>
                  </Descriptions>
               </Card>
            </Col>

            <Col xs={24}>
               <Card
                  title={
                     <span>
                        <InfoCircleOutlined /> {t('invoiceDetail.systemInfo')}
                     </span>
                  }
               >
                  <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered>
                     <Descriptions.Item label={t('invoiceDetail.createdTime')}>{dayjs(invoice.createdTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.lastUpdatedTime')}>
                        {dayjs(invoice.lastUpdatedTime).format('YYYY-MM-DD HH:mm:ss')}
                     </Descriptions.Item>
                     <Descriptions.Item label={t('invoiceDetail.fileName')}>{invoice.fileName || '-'}</Descriptions.Item>
                  </Descriptions>
               </Card>
            </Col>
         </Row>
      </div>
   );
};

export default InvoiceDetail;
