import React, { useEffect } from 'react';
import shortId from 'shortid';
import { Field as ReduxFormField, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitAccessToken, getIssuesForRepo } from '../thunks';
import { validateAccessToken } from './validate';

import './App.css';
import { ROUTER_REDUCER, MAIN_REDUCER } from '../modules/reducers';
import { PATHS } from '../modules/paths';

const Field = ({
  label,
  name,
  type = 'text',
  placeholder,
  input,
  meta: {
    touched,
    error,
  }
}) => {
  return (
    <div>
      <label htmlFor={name}>
        {label}
      </label>
      <div>
        <input {...input} placeholder={placeholder} name={name} type={type} />
        {touched && (error && <span>{error}</span>)}
      </div>
    </div>
  );
}

const Loader = () => {
  return <div>Loading...</div>;
};

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

const IssueCard = ({ title }) => {
  return (
    <div>
      {title}
    </div>
  );
};

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

const ACCESS_TOKEN_FORM = 'accessToken';
const formConfig = {
  form: ACCESS_TOKEN_FORM,
  validate: validateAccessToken,
};

const SignIn = ({ handleSubmit, submitting, pristine, invalid }) => {
  const dispatch = useDispatch();
  const onSubmit = ({ accessToken }) => {
    dispatch(submitAccessToken(accessToken))
  };

  return (
    <div>
      Sign in
      <form onSubmit={handleSubmit(onSubmit)}>
        <ReduxFormField
          label="Enter a Github access token"
          name='accessToken'
          placeholder="c0b4ac00746f91a6ac04a3b4c171e3b04e862275"
          component={Field}
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/settings/tokens"
        >
          What's that?
        </a>
        <button disabled={submitting || pristine || invalid} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
};

const SignInForm = reduxForm(formConfig)(SignIn);

const Router = () => {
  const location = useSelector((state) => state[ROUTER_REDUCER].location);

  const Page = {
    [PATHS.signIn]: SignInForm,
    [PATHS.dashboard]: Dashboard,
  }[location] || SignInForm;

  return <Page />
};

const App = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
