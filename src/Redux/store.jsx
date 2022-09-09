import { configureStore, } from '@reduxjs/toolkit';
import  valueSlice from './slice';

export const store = configureStore({
    reducer: { book: valueSlice.reducer },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
