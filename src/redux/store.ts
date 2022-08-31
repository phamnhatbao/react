import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from '../helpers/listener.middleware';

import accountReducer from './account.slide';

export function makeStore() {
  return configureStore({
    reducer: {
      account: accountReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
