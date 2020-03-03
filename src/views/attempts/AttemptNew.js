import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import Error from '../misc/Error';
import AttemptForm from './AttemptForm';
import ChallengeOutput from '../challenges/ChallengeOutput';

import saveAttempt from '../../actions/saveAttempt';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class AttemptNew extends React.Component {
  constructor() {
    super();
    this.resetError = this.resetError.bind(this);
  }

  state = {
    path: undefined,
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
                  <Link to="/login">
                    <wds-button>Sign in</wds-button>
                  </Link>
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
                      <h2>{challenge.title}</h2>
                      <div className="challenge-container">
                        <ChallengeOutput challenge={challenge} />
                      </div>
                      <AttemptForm
                        challenge={challenge}
                        path={this.state.path}
                        error={this.state.error}
                        onSubmit={values =>
                          saveAttempt(challenge.id, values, true)
                            .then(attempt => history.push(`/${attempt.path}`))
                            // if we error on SCSS compile, we've still
                            //  created the doc, so store that in state
                            //  to pass back into the form values
                            .catch(({ path, error }) =>
                              this.setState({ path, error })
                            )
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
