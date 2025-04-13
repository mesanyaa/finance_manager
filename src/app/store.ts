import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';
import categoryReducer from './slices/categorySlice';
import scheduledPaymentsReducer from './slices/scheduledPaymentsSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        transactions: transactionReducer,
        categories: categoryReducer,
        scheduledPayments: scheduledPaymentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
