import * as R from 'ramda';

import composeAsync from '../misc/compose-async.js';

const baseOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
const mergeOptions = R.mergeDeepWith(R.concat, baseOptions);

const callAPI = async (action, options = {}) => fetch(`${process.env.REACT_APP_API_URL}/${action}`, mergeOptions(options));

const lastMonthlyInflation = async () => (composeAsync([
  R.prop('monthlyInflationRate'),
  R.invoker(0, 'json'),
  callAPI
])('monthly-inflations/last', { method: 'GET' }));

export default lastMonthlyInflation;
