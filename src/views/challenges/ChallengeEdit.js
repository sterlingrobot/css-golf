import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';

import Error from '../misc/Error';
import updateChallenge from '../../actions/updateChallenge';
import deleteChallenge from '../../actions/deleteChallenge';

import ChallengeForm from './ChallengeForm';
import ChallengeOutput from './ChallengeOutput';

import { Page } from '../../styles/layout';
import { InternalLink } from '../../styles/links';

class ChallengeEdit extends React.Component {
  constructor() {
    super();
    this.output = React.createRef();
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

            if (data.length === 0) {
              return <Error />;
            }

            const challenge = data[0];

            return (
              <div>
                <InternalLink to="/" style={{ margin: '0 0 2rem' }}>
                  <wds-icon>arrow_back</wds-icon>
                  Back to Challenges
                </InternalLink>
                <div className="challenge-container">
                  <ChallengeOutput challenge={challenge} ref={this.output} />
                </div>
                <ChallengeForm
                  challenge={challenge}
                  onSubmit={values => {
                    updateChallenge(
                      challenge.id,
                      values,
                      this.output.current
                    ).then(() => history.push(`/${challenge.slug}/edit`));
                  }}
                  onDelete={() =>
                    deleteChallenge(challenge).then(() => history.push(`/`))
                  }
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
