import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import Error from '../misc/Error';
import AttemptForm from './AttemptForm';

import logIn from '../../actions/logIn';
import createAttempt from '../../actions/createAttempt';

import { Page } from '../../styles/layout';

const AttemptNew = ({ history, match }) => (
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
              <p>You must be logged in to attempt a challenge</p>
              <wds-button onClick={logIn}>Sign in</wds-button>
            </div>
          );
        }

        return (
          <FirestoreCollection
            path={'challenges'}
            filter={['slug', '==', match.params.slug]}
          >
            {({ error, isLoading, data }) => {
              if (error) {
                return <Error error={error} />;
              }

              if (isLoading) {
                return <p>loading...</p>;
              }

              if (data.length === 0) {
                return <Error />;
              }

              const challenge = data[0];

              return (
                <div>
                  <AttemptForm
                    challenge={challenge}
                    onSubmit={values =>
                      createAttempt(values).then(post =>
                        history.push(`/${post.slug}`)
                      )
                    }
                  />
                </div>
              );
            }}
          </FirestoreCollection>
        );
      }}
    </FirebaseAuth>
  </Page>
);

export default AttemptNew;

AttemptNew.propTypes = {
  history: PropTypes.shape(Route.history),
  match: PropTypes.shape(Route.match)
};
