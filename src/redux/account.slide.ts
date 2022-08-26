import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    const result = {
      username: 'wizpham',
      email: 'admin@site.com',
      description: 'This is a test description',
    };

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
        state.value = action.payload;
      });
  },
});

export const { logout } = accountSlice.actions;

export const selectAccount = (state: AppState) => state.account.value;

export default accountSlice.reducer;
