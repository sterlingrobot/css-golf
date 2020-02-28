import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import FirebaseAuth from '../misc/FirebaseAuth';
import Error from '../misc/Error';

import ChallengeForm from './ChallengeForm';

import createChallenge from '../../actions/createChallenge';

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
              <p>You must be logged in to add challenges</p>
              <Link to="/login">
                <wds-button>Sign in</wds-button>
              </Link>
            </div>
          );
        }

        return (
          <ChallengeForm
            onSubmit={values =>
              createChallenge(values).then(post =>
                history.push(`/${post.slug}/edit`)
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
  history: PropTypes.shape(Route.history)
};
