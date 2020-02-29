import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreDocument } from 'react-firestore';
import FirebaseAuth from '../misc/FirebaseAuth';

import { Route } from 'react-router-dom';

import Error from '../misc/Error';

import AttemptForm from './AttemptForm';
import AttemptOutput from './AttemptOutput';
import AttemptMarkup from '../attempts/AttemptMarkup';
import AttemptReport from './AttemptReport';
import ChallengeOutput from '../challenges/ChallengeOutput';
import ChallengeMarkup from '../challenges/ChallengeMarkup';
import DiffOutput from './DiffOutput';

import saveAttempt from '../../actions/saveAttempt';
import lintStyles from '../../actions/lintStyles';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class Attempt extends React.Component {
  constructor() {
    super();
    this.resetError = this.resetError.bind(this);
    this.onDiffResult = this.onDiffResult.bind(this);
    this.onLintResult = this.onLintResult.bind(this);
  }

  state = {
    error: null,
    diff: null,
    lint: null
  };

  resetError(_e) {
    this.setState({ error: null });
  }

  onDiffResult(total, diff) {
    this.setState({
      diff: {
        totalPixels: total,
        diffPixels: diff
      }
    });
  }

  onLintResult(css) {
    lintStyles(css).then(results =>
      this.setState({
        lint: results
      })
    );
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
                              onDiffResult={this.onDiffResult}
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
                            <AttemptReport
                              title={`Results for ${auth.displayName}`}
                              diff={this.state.diff}
                              lint={this.state.lint}
                            />
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
