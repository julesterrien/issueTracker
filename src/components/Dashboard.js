import React from 'react';
import moment from 'moment';
import { update } from 'novux';
import cn from 'classnames';
import shortId from 'shortid';
import { useSelector, useDispatch } from 'react-redux';

import { MAIN_REDUCER } from '../modules/reducers';

import Loader from './Loader';
import RepoCard from './RepoCard';
import Table from './Table';

import './dashboard.css';
import { sortIssuesByDate } from '../utils';
import { HEADERS } from './constants';

const Dashboard = () => {
  const repos = useSelector(state => state[MAIN_REDUCER].repos);
  const issues = useSelector(state => state[MAIN_REDUCER].issues);
  const isLoading = useSelector(state => state[MAIN_REDUCER].isLoading);
  const selectedRepo = useSelector(state => state[MAIN_REDUCER].selectedRepo);

  const dispatch = useDispatch();
  const onClickSort = ({ key, order }) => {
    const sortedIssues = sortIssuesByDate({ issues, key, order });
    dispatch(
      update(MAIN_REDUCER, 'sort issues', {
        issues: sortedIssues
      })
    );
  };

  if (!repos) {
    return (
      <div className="dashboard">
        <Loader />
      </div>
    );
  }

  if (!repos.length) {
    return (
      <div className="dashboard">
        You don't have any repos. Go to Github and create one.
      </div>
    );
  }

  return (
    <div className={cn('dashboard', { twoColumn: !!selectedRepo })}>
      <div className="repos">
        <h1 className="title">
          {!issues ? 'To view issues, select a repo' : 'Your repos'}
        </h1>
        <div className="repos-list">
          {repos.map(repo => {
            return <RepoCard key={shortId.generate()} {...repo} />;
          })}
        </div>
      </div>

      {issues && isLoading && (
        <Loader />
      )}

      {issues && !isLoading && (
        <div className="issues">
          <h1 className="title">Issues</h1>
          <div className="issues-list">
            <Table
              placeholder="This repo has no open issues"
              headers={HEADERS.map(header => ({
                ...header,
                ...(header.sortable && {
                  onClickSort: order => onClickSort({ key: header.key, order })
                })
              }))}
              rows={issues.map(
                ({
                  title,
                  user: { avatar_url: avatarUrl, login } = {},
                  created_at: createdAt,
                  updated_at: updatedAt,
                  url
                }) => [
                  <h2 className="title">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="issue-link"
                    >
                      {title}
                    </a>
                  </h2>,
                  <img className="avatar" src={avatarUrl} alt={login} />,
                  <div className="createdAt">
                    {moment(createdAt).format('MM/DD/YYYY')}
                  </div>,
                  <div className="updatedAt">{moment(updatedAt).fromNow()}</div>
                ]
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
