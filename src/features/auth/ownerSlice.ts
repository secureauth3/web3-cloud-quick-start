import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Owner } from '../../interface/auth-context.interface';
import { fetchOwnerById } from './ownerAPI';

export interface OwnerState {
  account: string;
  email: string;
  firstName: string;
  lastName: string;
  ens: string;
  startDate: number;
  chainId: number;
  status: 'idle' | 'loading' | 'failed'
}
  
const initialState: OwnerState = {
  account: '',
  email: '',
  firstName: '',
  lastName: '',
  ens: '',
  startDate: 0,
  chainId: 0,
  status: 'idle',
};

export const fetchOwner = createAsyncThunk(
  'owner/fetchOwnerById',
  async (account: string) => {
    const response = await fetchOwnerById(account);
    return response.data;
  }
);

export const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {         
      setEmail: (state, action: PayloadAction<string>) => {
        state.email += action.payload;
      },
      setFirstName: (state, action: PayloadAction<string>) => {
        state.firstName += action.payload;
      },
      setLastName: (state, action: PayloadAction<string>) => {
        state.lastName += action.payload;
      },
      setOwner: (state, action: PayloadAction<Owner>) => {
        state.account = action.payload.account;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.ens = action.payload.ens;
        state.chainId = action.payload.chainId;
      },
      signOutAccount: (state, action: PayloadAction<string>) => {
        state.account = action.payload;
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.ens = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOwner.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchOwner.fulfilled, (state, action) => {
          state.status = 'idle';
          state.account = action.payload.account;
          state.email = action.payload.email;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.ens = action.payload.ens;
          state.chainId = action.payload.chainId;
        })
        .addCase(fetchOwner.rejected, (state) => {
        });
    },
});

// Selectors
export const selectAccount = (state: RootState) => state.owner.account;
export const selectEmail = (state: RootState) => state.owner.email;
export const selectFirstName = (state: RootState) => state.owner.firstName;
export const selectLastName = (state: RootState) => state.owner.lastName;

// Actions
export const { 
  setEmail,
  setFirstName,
  setLastName,
  setOwner,
  signOutAccount,
} = ownerSlice.actions;

export default ownerSlice.reducer;
