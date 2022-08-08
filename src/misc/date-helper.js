import * as R from 'ramda';

const getMonth = R.invoker(2, 'slice')(5, 7);
const getYear = R.invoker(2, 'slice')(0, 4);

export { getMonth, getYear };
