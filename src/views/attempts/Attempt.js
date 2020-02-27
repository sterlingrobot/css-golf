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

import pixelmatch from 'pixelmatch';

import { Page } from '../../styles/layout';

import '../../styles/attempt.scss';

class Attempt extends React.Component {
  constructor() {
    super();
    this.output = React.createRef();
    this.measure = React.createRef();
    this.diff = React.createRef();
    this.resetError = this.resetError.bind(this);
    this.compareToChallenge = this.compareToChallenge.bind(this);
    this.writeDiffToOutput = this.writeDiffToOutput.bind(this);
  }

  state = {
    error: null
  };

  compareToChallenge(attempt, challenge) {
    const { offsetWidth, offsetHeight } = this.measure.current;
    console.log(offsetWidth, offsetHeight);
    saveAttempt(challenge.id, attempt, this.output.current).then(attempt =>
      Promise.all([
        imgToUint8Array(challenge.snapshot, offsetWidth, offsetHeight),
        imgToUint8Array(attempt.snapshot, offsetWidth, offsetHeight)
      ]).then(([snapshotImg, attemptImg]) => {
        const imgDataOutput = new ImageData(offsetWidth, offsetHeight);
        const diff = pixelmatch(
          snapshotImg,
          attemptImg,
          imgDataOutput.data,
          offsetWidth,
          offsetHeight,
          {
            threshold: 0.2,
            diffMask: true
          }
        );
        this.writeDiffToOutput(imgDataOutput);
        return console.log((diff / (offsetWidth * offsetHeight)) * 100);
      })
    );
  }

  writeDiffToOutput(imgDataOutput) {
    const canvas = this.diff.current;
    canvas.width = imgDataOutput.width;
    canvas.height = imgDataOutput.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(imgDataOutput, 0, 0);
  }

  resetError(_e) {
    this.setState({ error: null });
  }

  componentDidMount() {}

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
                            <DiffOutput ref={this.diff} />
                            <ChallengeOutput
                              challenge={challenge}
                              ref={this.measure}
                            />
                            <AttemptOutput
                              attempt={attempt}
                              challenge={challenge}
                              ref={this.output}
                            />
                            <div className="attempt-actions">
                              <wds-button
                                color="red"
                                onClick={() => {
                                  this.compareToChallenge(attempt, challenge);
                                }}
                              >
                                Compare
                              </wds-button>
                            </div>

                            {auth.uid === attempt.createdBy ? (
                              <AttemptForm
                                attempt={attempt}
                                challenge={challenge}
                                path={attempt.path}
                                error={this.state.error}
                                onSubmit={values =>
                                  saveAttempt(
                                    challenge.id,
                                    values,
                                    this.output.current
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
