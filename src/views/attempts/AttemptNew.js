import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import Error from '../misc/Error';
import AttemptForm from './AttemptForm';
import ChallengeOutput from '../challenges/ChallengeOutput';

import logIn from '../../actions/logIn';
import createAttempt from '../../actions/createAttempt';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class AttemptNew extends React.Component {
  constructor() {
    super();
    this.resetError = this.resetError.bind(this);
  }

  state = {
    error: null
  };

  resetError(_e) {
    this.setState({ error: null });
  }

  render() {
    const { history, match } = this.props;
    return (
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
                      <div className="challenge-container">
                        <ChallengeOutput challenge={challenge} />
                      </div>
                      <AttemptForm
                        challenge={challenge}
                        error={this.state.error}
                        onSubmit={values =>
                          createAttempt(challenge.id, values)
                            .then(attempt => {
                              return history.push(
                                `/${challenge.slug}/${attempt.path}`
                              );
                            })
                            .catch(error => this.setState({ error }))
                        }
                        onClick={this.resetError}
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
  }
}

export default AttemptNew;

AttemptNew.propTypes = {
  history: PropTypes.shape(Route.history),
  match: PropTypes.shape(Route.match)
};
