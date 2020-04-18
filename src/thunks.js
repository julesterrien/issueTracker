import { update } from 'novux';

import { MAIN_REDUCER, ROUTER_REDUCER } from './modules/reducers';

import * as api from './api';
import { PATHS } from './modules/paths';
import { LOCAL_STORAGE_KEY } from './constants';

import { sortIssuesByDate } from './utils';

const handleError = (error) => (dispatch) => {
  dispatch(
    update(MAIN_REDUCER, 'show error', {
      error,
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
        repos: data,
      })
    );
  }
};

export const submitAccessToken = (accessToken) => async (dispatch) => {
  const { data, error, status } = await api.getUser(accessToken);

  if (error || status !== 200) {
    dispatch(handleError(error));
  } else if (data) {
    dispatch(
      update(MAIN_REDUCER, 'save user data', {
        accessToken,
        username: data.login,
      })
    );

    dispatch(
      update(ROUTER_REDUCER, 'visit dashboard', {
        location: PATHS.dashboard,
      })
    );

    dispatch(getRepoData());
  }
};

export const getIssuesForRepo = (repoFullName) => async (
  dispatch,
  getState
) => {
  dispatch(
    update(MAIN_REDUCER, 'toggle isLoading', {
      isLoading: true,
    })
  );

  const state = getState();
  const accessToken = state[MAIN_REDUCER].accessToken;

  const { data, error, status } = await api.getIssues({
    repoFullName,
    accessToken,
  });

  if (error || status !== 200) {
    dispatch(handleError(error));
  } else if (data) {
    let issues = data;

    const setting = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (setting) {
      const { order, key } = setting && JSON.parse(setting);
      issues = sortIssuesByDate({
        issues: data,
        key,
        order,
      });
    }

    dispatch(
      update(MAIN_REDUCER, 'save issues', {
        issues,
      })
    );
  }

  dispatch(
    update(MAIN_REDUCER, 'toggle isLoading', {
      isLoading: false,
    })
  );
};

export const sortIssues = ({ issues, key, order }) => (dispatch) => {
  const sortedIssues = sortIssuesByDate({ issues, key, order });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ key, order }));

  dispatch(
    update(MAIN_REDUCER, 'sort issues', {
      issues: sortedIssues,
    })
  );
};
