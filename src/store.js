import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './coin/coinSlice';

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});
