import React from 'react';
import { Field as ReduxFormField, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';

import { submitAccessToken } from '../thunks';

import Field from './Field';
import { validateAccessToken } from './validate';

import './SignIn.css';

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
    <div className="sign-in">
      <div className="title">
        <span aria-label="emoji" role="img" className="title-emoji">🧐</span>
        <h1>Welcome to IssueTracker</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <ReduxFormField
          autoFocus
          label="To sign in, enter a Github access token"
          name='accessToken'
          placeholder="c0b4ac00746f91a6ac04a3b4c171e3b04e862275"
          component={Field}
        />
        <button disabled={submitting || pristine || invalid} type="submit">
          Submit
        </button>
        <div className="help">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/settings/tokens"
          >
            What's that?
          </a>
        </div>
      </form>
    </div>
  )
};

const SignInForm = reduxForm(formConfig)(SignIn);

export default SignInForm;
