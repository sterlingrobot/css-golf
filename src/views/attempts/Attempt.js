import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreDocument } from 'react-firestore';
import { Route } from 'react-router-dom';

import Error from '../misc/Error';

import AttemptForm from './AttemptForm';
import ChallengeOutput from '../challenges/ChallengeOutput';
import AttemptOutput from './AttemptOutput';

import createAttempt from '../../actions/createAttempt';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class Attempt extends React.Component {
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
    const { match } = this.props;
    return (
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
                    <div className="attempt-container">
                      <h2>{challenge.title}</h2>
                      <ChallengeOutput challenge={challenge} />
                      <AttemptOutput attempt={attempt} challenge={challenge} />
                      <AttemptForm
                        attempt={attempt}
                        challenge={challenge}
                        path={attempt.path}
                        error={this.state.error}
                        onSubmit={values =>
                          createAttempt(
                            challenge.id,
                            values
                          ).catch(({ error }) => this.setState({ error }))
                        }
                        onClick={this.resetError}
                      />
                    </div>
                  );
                }}
              </FirestoreDocument>
            );
          }}
        </FirestoreDocument>
      </Page>
    );
  }
}

export default Attempt;

Attempt.propTypes = {
  code: PropTypes.string,
  match: PropTypes.shape(Route.match)
};
