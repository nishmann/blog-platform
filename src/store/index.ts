import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './slices/articlesSlice';
import authSlice from './slices/authenticationSlice';

export const store = configureStore({
  reducer: {
    articlesSlice,
    authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
