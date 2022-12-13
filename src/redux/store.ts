import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './account.slide';

export function makeStore() {
  return configureStore({
    reducer: {
      account: accountReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
