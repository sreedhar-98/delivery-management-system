import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import vendorsReducer from './slices/vendorsSlice';
import deliveryPartnersReducer from './slices/deliveryPartnersSlice';
import ordersReducer from './slices/ordersSlice';
import deliveryPayoutsReducer from './slices/deliveryPayoutsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    vendors: vendorsReducer,
    deliveryPartners: deliveryPartnersReducer,
    orders: ordersReducer,
    stats: statsReducer,
    chart: chartReducer,
    alerts: alertsReducer,
    quickActions: quickActionsReducer,
    deliveryZones: deliveryZonesReducer,
    deliveryShifts: deliveryShiftsReducer,
    deliveryPayouts: deliveryPayoutsReducer,
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