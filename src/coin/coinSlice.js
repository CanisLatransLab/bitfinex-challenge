import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch exchange rates
export const fetchExchangeRates = createAsyncThunk(
  'portfolio/fetchExchangeRates',
  async () => {
    const assets = ['BTC', 'ETH', 'XRP'];
    const apiKey = import.meta.env.VITE_COINAPI_KEY;
    const promises = assets.map((asset) =>
      axios.get(
        `https://rest.coinapi.io/v1/exchangerate/${asset}/USD?apikey=${apiKey}`
      )
    );
    const responses = await Promise.all(promises);
    const exchangeRates = responses.reduce((acc, response, index) => {
      acc[assets[index]] = response.data.rate;
      return acc;
    }, {});
    return exchangeRates;
  }
);

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default portfolioSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   coin: '',
// };

// const coinSlice = createSlice({
//   name: 'coin',
//   initialState,
//   reducers: {
//     setCoin(state, action) {
//       state.coin = action.payload;
//     },
//   },
// });

// export const { setCoin } = coinSlice.actions;

// export default coinSlice.reducer;
