import React from 'react';
import { useSelector } from 'react-redux';

import { MAIN_REDUCER } from  '../modules/reducers';

const Banner = () => {
  const error = useSelector((state) => state[MAIN_REDUCER].error);

  return error ? <div>{error}</div> : null;
};

export default Banner;
