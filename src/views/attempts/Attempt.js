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
import deleteAttempt from '../../actions/deleteAttempt';

import { Page } from '../../styles/layout';
import { InternalLink } from '../../styles/links';
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
    saving: false
  };

  resetError(_e) {
    this.setState({ error: null });
  }

  render() {
    const { match, history } = this.props;
    return (
      <Page>
        <FirebaseAuth>
          {({ auth }) => {
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

                              return (
                                <div className="attempt-container">
                                  <InternalLink
                                    to={`/${challenge.slug}`}
                                    style={{ margin: '0 auto 1rem 0' }}
                                  >
                                    <wds-icon>arrow_back</wds-icon>
                                    Back to {challenge.title}
                                  </InternalLink>
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
                                      score={attempt.score && attempt.score.par}
                                      style={{ marginLeft: 'auto' }}
                                    />
                                  </header>
                                  <ChallengeOutput challenge={challenge} />
                                  <AttemptOutput
                                    attempt={attempt}
                                    html={challenge.html}
                                  />
                                  <DiffOutput
                                    snapshot={
                                      attempt.diff && attempt.diff.snapshot
                                    }
                                  />
                                  {auth.uid === attempt.createdBy ||
                                  auth.admin ? (
                                    <AttemptForm
                                      attempt={attempt}
                                      challenge={challenge}
                                      error={this.state.error}
                                      isSaving={this.state.saving}
                                      isComplete={
                                        attempt.score && attempt.score.complete
                                      }
                                      onSave={saving =>
                                        this.setState({ saving })
                                      }
                                      onSubmit={values =>
                                        saveAttempt(challenge.id, values, true)
                                          .then(_attempt =>
                                            this.setState({ saving: false })
                                          )
                                          .catch(({ error }) =>
                                            this.setState({
                                              error,
                                              saving: false
                                            })
                                          )
                                      }
                                      onDelete={() =>
                                        deleteAttempt(attempt).then(() =>
                                          history.push(`/${challenge.slug}`)
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
  match: PropTypes.shape(Route.match),
  history: PropTypes.shape(Route.history)
};
