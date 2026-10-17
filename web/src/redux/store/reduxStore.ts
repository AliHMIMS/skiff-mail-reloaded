import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import { reducer } from '../reducers';

export const store = configureStore({
  reducer: reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({ serializableCheck: false });
    if (process.env.NODE_ENV === 'development') {
      // redux-logger is typed against Redux 5, the toolkit against Redux 4
      return defaultMiddleware.concat(createLogger({ level: 'info', collapsed: true }) as Middleware);
    }
    return defaultMiddleware;
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
