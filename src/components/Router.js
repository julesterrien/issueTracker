import React from 'react';
import { useSelector } from 'react-redux';

import { ROUTER_REDUCER } from  '../modules/reducers';
import { PATHS } from  '../modules/paths';

import SignInForm from './SignIn';
import Dashboard from './Dashboard';

const Router = () => {
  const location = useSelector((state) => state[ROUTER_REDUCER].location);

  const Page = {
    [PATHS.signIn]: SignInForm,
    [PATHS.dashboard]: Dashboard,
  }[location] || SignInForm;

  return <Page />
};

export default Router;

