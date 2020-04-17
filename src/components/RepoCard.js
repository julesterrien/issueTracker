import React from 'react';
import { useDispatch } from 'react-redux';

import { getIssuesForRepo } from '../thunks';

const RepoCard = ({ name, full_name: fullName }) => {
  const dispatch = useDispatch();
  const onClickRepo = () => {
    dispatch(getIssuesForRepo(fullName))
  };

  return (
    <button type="button" onClick={onClickRepo}>
      {name}
    </button>
  );
};

export default RepoCard;
