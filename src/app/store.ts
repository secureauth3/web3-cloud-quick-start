import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ownerReducer from '../features/auth/ownerSlice';
import nftsSlice from '../features/nfts/nftsSlice'
export const store = configureStore({
  reducer: {
    owner: ownerReducer,
    nfts: nftsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
