// https://redux-toolkit.js.org/tutorials/quick-start
// https://bionicjulia.com/blog/implementing-rtk-query-in-react-native-app

import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import {baseApi} from '../services/baseApi';
import {authReducer} from '../redux/slices/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Use this instead of plain useDispatch for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Use this instead of useSelector for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

// https://redux-toolkit.js.org/rtk-query/api/setupListeners
setupListeners(store.dispatch);

export default store;
