import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import vendorsReducer from './slices/vendorsSlice';
import deliveryPartnersReducer from './slices/deliveryPartnersSlice';
import ordersReducer from './slices/ordersSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    vendors: vendorsReducer,
    deliveryPartners: deliveryPartnersReducer,
    orders: ordersReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;