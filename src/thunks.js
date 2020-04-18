import { update } from 'novux';

import { MAIN_REDUCER, ROUTER_REDUCER } from './modules/reducers';

import * as api from './api';
import { PATHS } from './modules/paths';

const handleError = error => dispatch => {
  dispatch(
    update(MAIN_REDUCER, 'show error', {
      error
    })
  );
};

const getRepoData = () => async (dispatch, getState) => {
  const state = getState();
  const accessToken = state[MAIN_REDUCER].accessToken;

  const { data, error, status } = await api.getRepos(accessToken);

  if (error || status !== 200) {
    dispatch(handleError(error));
  } else if (data) {
    dispatch(
      update(MAIN_REDUCER, 'save repos', {
        repos: data
      })
    );
  }
};

export const submitAccessToken = accessToken => async dispatch => {
  const { data, error, status } = await api.getUser(accessToken);

  if (error || status !== 200) {
    dispatch(handleError(error));
  } else if (data) {
    dispatch(
      update(MAIN_REDUCER, 'save user data', {
        accessToken,
        username: data.login
      })
    );

    dispatch(
      update(ROUTER_REDUCER, 'visit dashboard', {
        location: PATHS.dashboard
      })
    );

    dispatch(getRepoData());
  }
};

export const getIssuesForRepo = repoFullName => async (dispatch, getState) => {
  dispatch(
    update(MAIN_REDUCER, 'toggle isLoading', {
      isLoading: true,
    }),
  );

  const state = getState();
  const accessToken = state[MAIN_REDUCER].accessToken;

  const { data, error, status } = await api.getIssues({
    repoFullName,
    accessToken
  });

  if (error || status !== 200) {
    dispatch(handleError(error));
  } else if (data) {
    dispatch(
      update(MAIN_REDUCER, 'save issues', {
        issues: data
      })
    );
  }

  dispatch(
    update(MAIN_REDUCER, 'toggle isLoading', {
      isLoading: false,
    }),
  );

};
