import React from 'react';
import shortId from 'shortid';
import { useSelector } from 'react-redux';

import { MAIN_REDUCER } from '../modules/reducers';

import Loader from './Loader';
import RepoCard from './RepoCard';
import IssueCard from './IssueCard';

const Dashboard = () => {
  const repos = useSelector((state) => state[MAIN_REDUCER].repos);
  const issues = useSelector((state) => state[MAIN_REDUCER].issues);

  if (!repos) {
    return <Loader />
  }

  if (!repos.length) {
    return <div>You don't have any repos. Go to Github and create one.</div>
  }

  return (
    <div>
      {repos.map((repo) => {
        return <RepoCard key={shortId.generate()} {...repo} />;
      })}

      {issues && issues.map((issue) => (
        <IssueCard key={shortId.generate()} {...issue} />
      ))}
    </div>
  )
};

export default Dashboard;
