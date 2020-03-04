import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreDocument } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import { Route, Link } from 'react-router-dom';

import Error from '../misc/Error';

import AttemptForm from './AttemptForm';
import AttemptOutput from './AttemptOutput';
import AttemptMarkup from '../attempts/AttemptMarkup';
import AttemptReport from './AttemptReport';
import AttemptScore from './AttemptScore';

import ChallengeOutput from '../challenges/ChallengeOutput';
import ChallengeMarkup from '../challenges/ChallengeMarkup';
import DiffOutput from './DiffOutput';

import saveAttempt from '../../actions/saveAttempt';
import { scoreTotal } from '../../actions/scoreAttempt';

import { Page } from '../../styles/layout';
import { Avatar } from '../account/Avatar';
import DateFormat from '../misc/DateFormat';

import '../../styles/attempt.scss';

class Attempt extends React.Component {
  constructor() {
    super();
    this.resetError = this.resetError.bind(this);
  }

  state = {
    error: null,
    diff: null,
    complete: false
  };

  resetError(_e) {
    this.setState({ error: null });
  }

  render() {
    const { match } = this.props;
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
                  <p>You must be logged in to view attempts</p>
                  <Link to="/login">
                    <wds-button>Sign in</wds-button>
                  </Link>
                </div>
              );
            }

            return (
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
                          <FirestoreDocument
                            path={`users/${attempt.createdBy}`}
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

                              const user = data;
                              const score = scoreTotal(attempt, challenge);

                              return (
                                <div className="attempt-container">
                                  <header>
                                    <div style={{ marginRight: '1rem' }}>
                                      <Avatar user={user} width="5rem" />
                                    </div>
                                    <h2>
                                      {challenge.title} Attempt
                                      <small>
                                        by {user.displayName} &mdash;{' '}
                                        <DateFormat
                                          timestamp={
                                            attempt.updatedOn ||
                                            attempt.createdOn
                                          }
                                        />
                                      </small>
                                    </h2>
                                    <AttemptScore
                                      score={score.toPar()}
                                      style={{ marginLeft: 'auto' }}
                                    />
                                  </header>
                                  <ChallengeOutput challenge={challenge} />
                                  <AttemptOutput
                                    attempt={attempt}
                                    html={challenge.html}
                                  />
                                  <DiffOutput
                                    target={challenge.snapshot}
                                    match={attempt.snapshot}
                                    options={{ threshold: 0.5 }}
                                    onDiffResult={(totalPixels, diffPixels) => {
                                      saveAttempt(challenge.id, {
                                        ...attempt,
                                        ...{ diff: { totalPixels, diffPixels } }
                                      }).then(attempt =>
                                        this.setState({
                                          complete: scoreTotal(
                                            attempt,
                                            challenge
                                          ).isComplete(),
                                          diff: {
                                            totalPixels,
                                            diffPixels
                                          }
                                        })
                                      );
                                    }}
                                  />
                                  {auth.uid === attempt.createdBy ? (
                                    <AttemptForm
                                      attempt={attempt}
                                      challenge={challenge}
                                      path={attempt.path}
                                      error={this.state.error}
                                      isComplete={this.state.complete}
                                      onSubmit={values =>
                                        saveAttempt(
                                          challenge.id,
                                          values,
                                          true
                                        ).catch(({ error }) =>
                                          this.setState({ error })
                                        )
                                      }
                                      onClick={this.resetError}
                                    />
                                  ) : (
                                    <div className="attempt-static">
                                      <ChallengeMarkup html={challenge.html} />
                                      <AttemptMarkup css={attempt.css} />
                                    </div>
                                  )}
                                  <AttemptReport
                                    title="Score"
                                    attempt={attempt}
                                    challenge={challenge}
                                  ></AttemptReport>
                                </div>
                              );
                            }}
                          </FirestoreDocument>
                        );
                      }}
                    </FirestoreDocument>
                  );
                }}
              </FirestoreDocument>
            );
          }}
        </FirebaseAuth>
      </Page>
    );
  }
}

export default Attempt;

Attempt.propTypes = {
  code: PropTypes.string,
  match: PropTypes.shape(Route.match)
};
