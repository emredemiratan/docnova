import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Invoice } from '../../types/invoice';
import api from '../../services/api';

interface InvoiceState {
   invoices: Invoice[];
   selectedInvoice: Invoice | null;
   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
   error: string | null;
}

const initialState: InvoiceState = {
   invoices: [],
   selectedInvoice: null,
   loading: 'idle',
   error: null,
};

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
   const response = await api.post('/invoice/search', {
      companyId: '01c880ca-46b5-4699-a477-616b84770071',
      documentType: 'OUTGOING',
      endDate: '2025-07-04T08:31:10.422Z',
      page: 0,
      size: 100,
      startDate: '2025-06-27T00:00:00.000Z',
   });
   return response.data.invoices.content as Invoice[];
});

const invoiceSlice = createSlice({
   name: 'invoice',
   initialState,
   reducers: {
      setSelectedInvoice(state, action: PayloadAction<Invoice | null>) {
         state.selectedInvoice = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchInvoices.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
         })
         .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>) => {
            state.loading = 'succeeded';
            state.invoices = action.payload;
         })
         .addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message || 'Failed to fetch invoices';
         });
   },
});

export const { setSelectedInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
