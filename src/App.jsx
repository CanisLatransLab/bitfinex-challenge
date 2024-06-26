// src/App.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRates } from './coin/coinSlice';

function App() {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio.data);
  const status = useSelector((state) => state.portfolio.status);
  const error = useSelector((state) => state.portfolio.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExchangeRates());
    }
  }, [status, dispatch]);

  return (
    <div className='grid place-content-center h-screen text-center'>
      <img
        src='https://www.bitfinex.com/images/bitfinex-logo.svg'
        alt='bitfinex logo'
        className='w-[10rem] mx-auto'
      />
      <h1>Interview challenge:</h1>
      <h2 className='font-thin'>Cryptocurrency Portfolio Fetch with Redux</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
        <ul>
          {Object.entries(portfolio).map(([asset, exchangeRate]) => (
            <li key={asset} className='flex justify-center'>
              <h3 className='font-thin flex gap-2'>
                {asset}:
                <span className='font-black'>{exchangeRate.toFixed(2)}</span>
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
