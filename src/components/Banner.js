import React, { useEffect } from 'react';
import { update } from 'novux';
import { useSelector, useDispatch } from 'react-redux';

import { MAIN_REDUCER } from '../modules/reducers';

import './Banner.css';

const ErrorMessage = ({ msg }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        update(MAIN_REDUCER, 'clear error', {
          error: undefined
        })
      );
    }, 5000);
  }, []);

  return <div className="banner">{msg}</div>;
};

const Banner = () => {
  const error = useSelector(state => state[MAIN_REDUCER].error);
  const msg = error || 'Oops something went wrong';
  return error ? <ErrorMessage msg={msg} /> : null;
};

export default Banner;
