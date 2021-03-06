import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';

import Error from '../misc/Error';
import saveChallenge from '../../actions/saveChallenge';
import deleteChallenge from '../../actions/deleteChallenge';

import ChallengeForm from './ChallengeForm';
import ChallengeOutput from './ChallengeOutput';

import { Page } from '../../styles/layout';
import { InternalLink } from '../../styles/links';

class ChallengeEdit extends React.Component {
  constructor() {
    super();
    this.resetError = this.resetError.bind(this);
  }

  state = {
    deleting: false,
    error: null
  };

  resetError(_e) {
    this.setState({ error: null });
  }

  render() {
    const { match, history } = this.props;
    return (
      <Page>
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

            if (data.length === 0 && !this.state.deleting) {
              return <Error />;
            }

            if (this.state.deleting) {
              return <p>Redirecting...</p>;
            }

            const challenge = data[0];

            return (
              <div>
                <InternalLink to="/" style={{ margin: '0 0 2rem' }}>
                  <wds-icon>arrow_back</wds-icon>
                  Back to Challenges
                </InternalLink>
                <div className="challenge-container">
                  <ChallengeOutput challenge={challenge} />
                </div>
                <ChallengeForm
                  challenge={challenge}
                  error={this.state.error}
                  onSubmit={values => {
                    saveChallenge(values).then(
                      challengeEdit =>
                        challengeEdit.slug !== challenge.slug &&
                        history.push(`/${challengeEdit.slug}/edit`)
                    );
                  }}
                  onDelete={() =>
                    this.setState({ deleting: true }, () =>
                      deleteChallenge(challenge).then(() => history.push(`/`))
                    )
                  }
                  onClick={this.resetError}
                />
              </div>
            );
          }}
        </FirestoreCollection>
      </Page>
    );
  }
}

export default ChallengeEdit;

ChallengeEdit.propTypes = {
  match: PropTypes.shape(Route.match),
  history: PropTypes.shape(Route.history)
};
