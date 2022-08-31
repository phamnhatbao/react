import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../helpers/axios.client';
import { AppState } from './store';

export interface Account {
  username?: string;
  email?: string;
  description?: string;
  role?: string;
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
    await axiosClient.post<Account>('/account/signin', params);
    // return getInfoAsync();
  },
);

export const getInfoAsync = createAsyncThunk(
  'account/getInfoAsync',
  async () => {
    const result = await axiosClient.get<Account>('/account');
    console.log('account/getInfoAsync', result);
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
      // loginAsync
      .addCase(loginAsync.rejected, (state) => {
        state.value = null;
        sessionStorage.removeItem('account');
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.value = {};
        sessionStorage.setItem('account', 'true');
      })
      // getInfoAsync
      .addCase(getInfoAsync.fulfilled, (state, action) => {
        console.log('extraReducers getInfoAsync', action);
        state.value = action.payload.data;
      })
      ;
  },
});

export const { logout } = accountSlice.actions;

export const selectAccount = (state: AppState) => state.account.value;

export default accountSlice.reducer;
