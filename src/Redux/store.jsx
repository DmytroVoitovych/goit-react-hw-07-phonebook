import { configureStore } from '@reduxjs/toolkit';
import { valueSlicePersist } from './slice';
import { persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER, } from 'redux-persist';


export const store = configureStore({
    reducer: { book: valueSlicePersist },
    middleware(getDefaultMiddleware) { // добавляем исключения
       return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    },
});
export let persistor = persistStore(store);