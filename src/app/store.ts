import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/auth-features/userSlice';
import nftsSlice from '../features/nfts/nftsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    nfts: nftsSlice,
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
