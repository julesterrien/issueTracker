import React from 'react';
import cn from 'classnames';
import { update } from 'novux';
import { useDispatch, useSelector } from 'react-redux';

import { getIssuesForRepo } from '../thunks';

import './RepoCard.css';
import { MAIN_REDUCER } from '../modules/reducers';

const RepoCard = ({ name, full_name: fullName }) => {
  const selectedRepo = useSelector(state => state[MAIN_REDUCER].selectedRepo);

  const dispatch = useDispatch();
  const onClickRepo = () => {
    dispatch(
      update(MAIN_REDUCER, 'select repo', {
        selectedRepo: fullName
      })
    );
    dispatch(getIssuesForRepo(fullName));
  };

  return (
    <button
      type="button"
      onClick={onClickRepo}
      className={cn('repo-card', { selected: selectedRepo === fullName })}
      disabled={selectedRepo === fullName}
    >
      {name}
    </button>
  );
};

export default RepoCard;
