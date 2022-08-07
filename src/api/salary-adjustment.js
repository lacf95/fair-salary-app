import * as R from 'ramda';

import composeAsync from '../misc/compose-async';

const baseOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};
const mergeOptions = R.mergeDeepWith(R.concat, baseOptions);

const callAPI = async (action, options = {}) => fetch(`${process.env.REACT_APP_API_URL}/${action}`, mergeOptions(options));

const salaryAdjustment = async body => (composeAsync([
  R.prop('salaryAdjustment'),
  R.invoker(0, 'json'),
  callAPI
])('salary-adjustments', { method: 'POST', body: JSON.stringify(body) }));

export default salaryAdjustment;
