import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import FirebaseAuth from '../misc/FirebaseAuth';

import Error from '../misc/Error';
import logIn from '../../actions/logIn';
import createAttempt from '../../actions/createAttempt';
import AttemptForm from './AttemptForm';

import { Page } from '../../styles/layout';

const AttemptNew = ({ history }) => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <div>loading...</div>;
        }

        if (!auth) {
          return (
            <div>
              <p>You must be logged in to add posts</p>
              <wds-button onClick={logIn}>Sign in</wds-button>
            </div>
          );
        }

        return (
          <AttemptForm
            onSubmit={values =>
              createAttempt(values).then(post => history.push(`/${post.slug}`))
            }
          />
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default AttemptNew;

AttemptNew.propTypes = {
  history: PropTypes.instanceOf(Route.history)
};
