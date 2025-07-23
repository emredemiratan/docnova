import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import invoiceReducer from './slices/invoiceSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      invoice: invoiceReducer,
      theme: themeReducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
