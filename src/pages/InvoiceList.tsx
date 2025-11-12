import React, { useEffect } from 'react';
import { Table, Button, Card, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchInvoices, setSelectedInvoice } from '../redux/slices/invoiceSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Invoice } from '../types/invoice';

const InvoiceList: React.FC = () => {
   const { t } = useTranslation();
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   const { invoices, loading, error } = useSelector((state: RootState) => state.invoice);
   const user = useSelector((state: RootState) => state.user.user);

   useEffect(() => {
      if (user) {
         dispatch(fetchInvoices());
      }
   }, [user, dispatch]);

   const handleDetail = (invoice: Invoice) => {
      dispatch(setSelectedInvoice(invoice));
      navigate(`/invoice-detail/${invoice.id}`);
   };

   const columns: ColumnsType<Invoice> = [
      {
         title: t('invoiceList.invoiceNumber'),
         dataIndex: 'invoiceNumber',
         key: 'invoiceNumber',
      },
      {
         title: t('invoiceList.customerName'),
         dataIndex: 'customerName',
         key: 'customerName',
         render: (text: string) => (text ? text.toLocaleUpperCase('tr-TR') : '-'),
      },
      {
         title: t('invoiceList.supplierName'),
         dataIndex: 'supplierName',
         key: 'supplierName',
         render: (text: string) => (text ? text.toLocaleUpperCase('tr-TR') : '-'),
      },
      {
         title: t('invoiceList.documentType'),
         dataIndex: 'documentType',
         key: 'documentType',
         render: (text: string) => (text ? text.toLocaleUpperCase('tr-TR') : '-'),
      },

      {
         title: t('invoiceList.amount'),
         key: 'totalAmount',
         render: (_, record) => {
            const total = record.paymentDetails?.totalAmount ?? record.payableAmount ?? '-';
            const currency = record.currency ?? '';
            return `${total} ${currency}`;
         },
      },
      {
         title: t('invoiceList.action'),
         key: 'action',
         render: (_, record) => <Button onClick={() => handleDetail(record)}>{t('invoiceList.detail')}</Button>,
      },
   ];

   if (error) {
      return <Alert message={t('global.error')} description={error} type="error" showIcon />;
   }

   return (
      <div style={{ padding: 24, minHeight: 360 }}>
         <Card title={t('invoiceList.title')}>
            <Table
               loading={loading === 'pending'}
               dataSource={invoices}
               columns={columns}
               rowKey="id"
               scroll={{ x: 'max-content' }}
            />
         </Card>
      </div>
   );
};

export default InvoiceList;
