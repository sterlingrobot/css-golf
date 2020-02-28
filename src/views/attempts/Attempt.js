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
import imgToUint8Array from '../../actions/imageDataToArray';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class Attempt extends React.Component {
  constructor() {
    super();
    this.attemptOutput = React.createRef();
    this.challengeOutput = React.createRef();
    this.resetError = this.resetError.bind(this);
    this.prepareSnapshots = this.prepareSnapshots.bind(this);
  }

  state = {
    error: null,
    imgData: null
  };

  prepareSnapshots(challenge, values) {
    // compare based on height of the challenge
    const { offsetWidth, offsetHeight } = this.challengeOutput.current;
    // first unset imgData to avoid unnecessary diff
    this.setState({ imgData: null }, () =>
      // save the css to the database
      saveAttempt(challenge.id, values)
        // and wait for updated css to capture new snapshot
        .then(result =>
          saveAttempt(challenge.id, result, this.attemptOutput.current)
        )
        // convert the snapshots into image data
        .then(attempt =>
          Promise.all([
            imgToUint8Array(challenge.snapshot, offsetWidth, offsetHeight),
            imgToUint8Array(attempt.snapshot, offsetWidth, offsetHeight)
          ])
        )
        // set state for DiffOutput to pick up
        .then(([challengeImg, attemptImg]) =>
          this.setState({
            imgData: {
              target: challengeImg,
              attempt: attemptImg,
              width: offsetWidth,
              height: offsetHeight
            }
          })
        )
        .catch(({ error }) => this.setState({ error }))
    );
  }

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
                            <ChallengeOutput
                              challenge={challenge}
                              ref={this.challengeOutput}
                            />
                            <AttemptOutput
                              attempt={attempt}
                              html={challenge.html}
                              ref={this.attemptOutput}
                            />
                            <DiffOutput imgData={this.state.imgData} />
                            {auth.uid === attempt.createdBy ? (
                              <AttemptForm
                                attempt={attempt}
                                challenge={challenge}
                                path={attempt.path}
                                error={this.state.error}
                                onSubmit={values =>
                                  this.prepareSnapshots(challenge, values)
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
