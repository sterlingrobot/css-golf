import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import FirebaseAuth from '../misc/FirebaseAuth';

import Error from '../misc/Error';
import logIn from '../../actions/logIn';
import createChallenge from '../../actions/createChallenge';
import ChallengeForm from './ChallengeForm';
import { Page } from '../../styles/layout';

const ChallengeNew = ({ history }) => (
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
              <button onClick={logIn}>Sign in</button>
            </div>
          );
        }

        return (
          <ChallengeForm
            onSubmit={values =>
              createChallenge(values).then(post =>
                history.push(`/${post.slug}`)
              )
            }
          />
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default ChallengeNew;

ChallengeNew.propTypes = {
  history: PropTypes.instanceOf(Route.history)
};
