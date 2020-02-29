import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreDocument } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import { Route } from 'react-router-dom';

import Error from '../misc/Error';

import AttemptForm from './AttemptForm';
import AttemptOutput from './AttemptOutput';
import AttemptMarkup from '../attempts/AttemptMarkup';
import ChallengeOutput from '../challenges/ChallengeOutput';
import ChallengeMarkup from '../challenges/ChallengeMarkup';
import DiffOutput from './DiffOutput';

import saveAttempt from '../../actions/saveAttempt';

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
        <FirebaseAuth>
          {({ isLoading, error, auth }) => {
            if (error) {
              return <Error error={error} />;
            }

            if (isLoading) {
              return <div>loading...</div>;
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
                          <div className="attempt-container">
                            <h2>{challenge.title}</h2>
                            <ChallengeOutput challenge={challenge} />
                            <AttemptOutput
                              attempt={attempt}
                              html={challenge.html}
                            />
                            <DiffOutput
                              target={challenge.snapshot}
                              match={attempt.snapshot}
                              onDiffResult={(total, diff) =>
                                console.log(`SCORE:
                                  ${100 - (diff / total) * 100}
                                `)
                              }
                            />
                            {auth.uid === attempt.createdBy ? (
                              <AttemptForm
                                attempt={attempt}
                                challenge={challenge}
                                path={attempt.path}
                                error={this.state.error}
                                onSubmit={values =>
                                  saveAttempt(
                                    challenge.id,
                                    values
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
                          </div>
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
