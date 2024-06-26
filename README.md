# Bitfinex challenge: React + Redux
## Challenge one:

	1.	Setup Redux Store: Create a Redux store and configure it with the slice reducer.
	2.	Create Slice: Use createSlice to define the state, reducers, and async thunk for fetching data.
	3.	Configure Axios: Use Axios within the async thunk to fetch data from the API.
	4.	Dispatch Fetch Action: Dispatch the fetch action in a React component.
	5.	Present Data: Use useSelector to select state from the Redux store and display it in the component.

## Challenge 2: `generateUrl` Function

```javascript
function generateUrl(params) {
  const baseUrl = 'http://testurl.bitfinx.com/';
  const queryParams = Object.entries(params)
    .filter(([key, value]) => value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${baseUrl}?${queryParams}`;
}

const params = {
  width: 360,
  height: 300,
  locale: 'en',
  toolbar_bg: '',
  interval: '3h',
  pair: 'BTC_USD',
};

console.log(generateUrl(params));

// Output: "http://testurl.bitfinx.com/?height=300&interval=3h&locale=en&pair=BTC_USD&width=360"

```

## Challenge 3: Imporoving the code of the function:

```javascript
// var volumeSetup = function () {
//     // setup volume unit interface
//     var volumeUnit = window.APP.util.getSettings('ticker_vol_unit').toUpperCase();
//     var element = null;
//     if (volumeUnit === 'FIRSTCCY') {
//     element = $('#tickervolccy_0');
//     } else if (volumeUnit === 'USD') {
//     element = $('#tickervolccy_USD');
//     } else if (volumeUnit === 'BTC') {
//     element = $('#tickervolccy_BTC');
//     } else if (volumeUnit === 'ETH') {
//     element = $('#tickervolccy_ETH');
//     }
//     if (element) {
//     element.prop("checked", true);
//     }
//     // override currencies list
//     var result = window.APP.util.initCurrenciesList()
//     return result
//     }

const volumeSetup = () => {
  const volumeUnit = window.APP.util
    .getSettings('ticker_vol_unit')
    .toUpperCase();
  const volumeUnitsMap = {
    FIRSTCCY: '#tickervolccy_0',
    USD: '#tickervolccy_USD',
    BTC: '#tickervolccy_BTC',
    ETH: '#tickervolccy_ETH',
  };

  const selector = volumeUnitsMap[volumeUnit];
  if (selector) {
    $(selector).prop('checked', true);
  }

  return window.APP.util.initCurrenciesList();
};

```

 1.	Use of const and let:
   •	Change: Replaced var with const for variables that are not reassigned.
   •	Benefit: const and let provide block scope, reducing potential errors due to variable hoisting and reassignment.
 2.	Map Object for Selector Lookup:
   •	Change: Created a volumeUnitsMap object to map volumeUnit values to their corresponding selectors.
   •	Benefit: This simplifies the lookup process, making the code more readable and easier to maintain. Adding or removing volume units now requires only changes in one place.
 3.	Simplified Element Selection:
   •	Change: Replaced the multiple if statements with a single lookup in the volumeUnitsMap.
   •	Benefit: Reduces code redundancy and improves performance by avoiding multiple conditional checks.
 4.	Consistent Function Return:
   •	Change: Directly returned the result of window.APP.util.initCurrenciesList().
   •	Benefit: Ensures the function’s purpose is clear and its return value is consistent and predictable.



