import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerifiedAuth3User } from 'web3-cloud';
import { RootState } from '../../app/store';
import { fetchUser } from './userAPI';

export interface UserState {
  account: string;
  dappName: string;
  permissionFlags: number;
  permissionType: string;
  email: string;
  firstName: string;
  lastName: string;
  ens: string;
  lastLogin: string;
  chainId: number;
  accessToken: string;
  refreshToken: string;
  isVerified: boolean;
  networkName: string;
  networkScanner: string;
  isConnected: string;
  walletName: string;
  status: 'idle' | 'loading' | 'failed'
}
  
const initialState: UserState = {
  account: '',
  dappName: '',
  permissionFlags: 0,
  email: '',
  firstName: '',
  lastName: '',
  permissionType: '',
  ens: '',
  lastLogin: '',
  chainId: 0,
  status: 'idle',
  accessToken: '',
  refreshToken: 'default',
  isVerified: false,
  networkName: '',
  networkScanner: '',
  isConnected: '',
  walletName: ''
};

export const fetchUserById = createAsyncThunk(
  'user/fetchUser',
  async (data: {account: string, accessToken:string, apiKey: string}) => {
    const response = await fetchUser(data.account, data.accessToken, data.apiKey);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setChainIdInfo: (state, action: PayloadAction<{networkName: string, networkScanner: string}>) => {
      state.networkName = action.payload.networkName;
      state.networkScanner = action.payload.networkScanner;
    },
    setWalletStatus: (state, action: PayloadAction<{isWalletConnected: string, walletName: string}>) => {
      localStorage.setItem('isWalletConnected', `${action.payload.isWalletConnected}`);
      localStorage.setItem('walletConnectedProvider', action.payload.walletName);
      state.isConnected = action.payload.isWalletConnected;
      state.walletName = action.payload.walletName;
    },
    setAccesToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setisVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setUser: (state, action: PayloadAction<VerifiedAuth3User>) => {
      state.account = action.payload.account;
      state.dappName = action.payload.dappName;
      state.permissionFlags = action.payload.permissionFlags;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.ens = action.payload.ens;
      state.lastLogin = new Date(action.payload.lastLogin).toISOString();
      state.chainId = action.payload.chainId;
      state.permissionType = action.payload.permissionType;
    },
    signOutAccount: (state) => {
      localStorage.setItem('isWalletConnected', 'false');
      localStorage.setItem('walletConnectedProvider', '');
      state.account = '';
      state.dappName = '';
      state.permissionFlags = 0;
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.permissionType = '';
      state.ens = '';
      state.lastLogin = '';
      state.chainId = 0;
      state.status = 'idle';
      state.accessToken = '';
      state.refreshToken = '';
      state.isVerified = false;
      state.isConnected = '';
      state.walletName = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.account = action.payload.account;
        state.dappName = action.payload.dappName;
        state.permissionFlags = action.payload.permissionFlags;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.ens = action.payload.ens;
        state.lastLogin = new Date(action.payload.lastLogin).toISOString();
        state.chainId = action.payload.chainId;  
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.account = '';
        state.dappName = '';
        state.permissionFlags = 0;
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.ens = '';
        state.lastLogin = '';
        state.chainId = 0;
        state.accessToken = '';
        state.isVerified = false;
      })
  }
});

// Selectors
export const selectAccount = (state: RootState) => state.user.account;
export const selectEmail = (state: RootState) => state.user.email;
export const selectEns = (state: RootState) => state.user.ens;
export const selectFirstName = (state: RootState) => state.user.firstName;
export const selectLastName = (state: RootState) => state.user.lastName;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;
export const selectDappName = (state: RootState) => state.user.dappName;
export const selectLastLogin = (state: RootState) => state.user.lastLogin;
export const selectChainId = (state: RootState) => state.user.chainId;
export const selectPermissionFlags= (state: RootState) => state.user.permissionFlags;
export const selectPermissionType= (state: RootState) => state.user.permissionType;
export const selectisVerified= (state: RootState) => state.user.isVerified;
export const selectWalletName = (state: RootState) => state.user.walletName;

// Actions
export const { 
  setUser,
  setChainIdInfo,
  setWalletStatus,
  signOutAccount,
  setAccesToken,
  setRefreshToken,
  setisVerified,
} = userSlice.actions;

export default userSlice.reducer;
