import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import { Route } from 'react-router-dom';

import Error from '../misc/Error';
import FirebaseAuth from '../misc/FirebaseAuth';

import { ChallengeOutput } from './ChallengeOutput';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';

class Challenge extends React.Component {
  render() {
    const {
      props: { match }
    } = this;
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
                <h1>{challenge.title}</h1>
                <ChallengeOutput challenge={challenge} />
                <FirebaseAuth>
                  {({ auth }) =>
                    auth ? (
                      <InternalLink to={`/${challenge.slug}/edit`}>
                        Edit
                      </InternalLink>
                    ) : null
                  }
                </FirebaseAuth>
              </div>
            );
          }}
        </FirestoreCollection>
      </Page>
    );
  }
}

export default Challenge;

Challenge.propTypes = {
  code: PropTypes.string,
  match: PropTypes.instanceOf(Route)
};
