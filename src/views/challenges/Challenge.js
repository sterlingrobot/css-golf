import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreCollection } from 'react-firestore';
import { Route } from 'react-router-dom';

import Error from '../misc/Error';
import FirebaseAuth from '../misc/FirebaseAuth';

import ChallengeOutput from './ChallengeOutput';
import ChallengeMarkup from './ChallengeMarkup';

import AttemptList from '../attempts/AttemptList';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';

import '../../styles/challenge.scss';
import { Par } from '../../styles/score';

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
              <div className="challenge">
                <InternalLink to="/" style={{ margin: '0 auto 1rem 0' }}>
                  <wds-icon>arrow_back</wds-icon>
                  Back to Challenges
                </InternalLink>

                <header>
                  <h1>{challenge.title}</h1>
                  <Par>{challenge.par}</Par>
                  <FirebaseAuth>
                    {({ auth }) =>
                      auth && auth.admin && auth.uid === challenge.createdBy ? (
                        <InternalLink to={`/${challenge.slug}/edit`}>
                          <wds-button>Edit Challenge</wds-button>
                        </InternalLink>
                      ) : auth ? (
                        <InternalLink to={`/${challenge.slug}/attempt`}>
                          <wds-button color="green">
                            Attempt Challenge
                          </wds-button>
                        </InternalLink>
                      ) : null
                    }
                  </FirebaseAuth>
                </header>
                <div className="challenge-container">
                  <ChallengeOutput challenge={challenge} />
                </div>
                <ChallengeMarkup html={challenge.html} />
                <FirebaseAuth>
                  {({ auth }) => auth && <AttemptList challenge={challenge} />}
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
  match: PropTypes.shape(Route.match)
};
