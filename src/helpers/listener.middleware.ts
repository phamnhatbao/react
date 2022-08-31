import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit';

import type { AppState, AppDispatch } from '../redux/store';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<AppState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  AppState,
  AppDispatch
>;
