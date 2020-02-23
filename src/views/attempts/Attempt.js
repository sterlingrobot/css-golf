import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreDocument } from 'react-firestore';
import { Route } from 'react-router-dom';

import Error from '../misc/Error';

import { Page } from '../../styles/layout';
import ChallengeOutput from '../challenges/ChallengeOutput';

const Attempt = ({ match }) => (
  <Page>
    <FirestoreDocument path={`attempts/${match.params.id}`}>
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

        const attempt = data;

        return (
          <FirestoreDocument path={`challenges/${attempt.challenge}`}>
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

              const challenge = data;

              return (
                <div>
                  <h2>{challenge.title}</h2>
                  <ChallengeOutput challenge={challenge} />
                  <p>{attempt.style}</p>
                </div>
              );
            }}
          </FirestoreDocument>
        );
      }}
    </FirestoreDocument>
  </Page>
);

export default Attempt;

Attempt.propTypes = {
  code: PropTypes.string,
  match: PropTypes.shape(Route.match)
};
