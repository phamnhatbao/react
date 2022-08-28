import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosClient from '../helpers/axios.client';
import { AppState } from './store';

export interface Account {
  username?: string;
  email?: string;
  description?: string;
}

export interface AccountState {
  value: Account | null;
}

const initialState: AccountState = {
  value: null,
};

export const loginAsync = createAsyncThunk(
  'account/loginAsync',
  async (params: {email: string, password: string}) => {
    const result = await axiosClient.post<Account>('/account/signin', params);
    return result;
  },
);

export const getInfoAsync = createAsyncThunk(
  'account/getInfoAsync',
  async () => {
    const result = await axios.get<Account>('/account');
    return result;
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.value = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAsync.rejected, (state) => {
        state.value = {};
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.value = action.payload.data;
      });
  },
});

export const { logout } = accountSlice.actions;

export const selectAccount = (state: AppState) => state.account.value;

export default accountSlice.reducer;
