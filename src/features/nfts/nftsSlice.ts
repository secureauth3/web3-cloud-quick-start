import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listOwnerNFTs } from './nftsAPI';

export interface NFTProps {
  id: string;
  name: string;
  owner: string;
}

export interface OwnerNFTsState {
  nftsList: NFTProps[],
  status: 'idle' | 'loading' | 'failed';
}
  
const initialState: OwnerNFTsState = {
  nftsList: [],
  status: 'idle',
};

export const fetchOwnersNFTs = createAsyncThunk(
  'dappUsers/fetchOwnersNFTs',
  async (account: string) => {
    const response = await listOwnerNFTs(account);
    return response.data;
  }
);

export const nftsSlice = createSlice({
    name: 'nfts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchOwnersNFTs.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchOwnersNFTs.fulfilled, (state, action) => {
          state.status = 'idle';
          let formatedUsers: NFTProps[] = [];
          if (action.payload.length > 0) {
            action.payload.forEach((item: any) => {
              formatedUsers.push({
                id: item.id,
                name: item.name,
                owner: item.owner
              } as NFTProps);
            });
          }
          
          state.nftsList = formatedUsers;
        })
        .addCase(fetchOwnersNFTs.rejected, (state, action) => {
        });
    },
});

// Selectors
export const selectNFTsList = (state: RootState) => state.nfts.nftsList;

export default nftsSlice.reducer;
