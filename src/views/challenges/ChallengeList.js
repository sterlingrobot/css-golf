import React from 'react';
import { Link } from 'react-router-dom';

import FirebaseAuth from '../misc/FirebaseAuth';
import { FirestoreCollection } from 'react-firestore';

import Error from '../misc/Error';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';

const ChallengeList = () => (
  <Page>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <div>loading...</div>;
        }

        if (auth && auth.admin) {
          return (
            <Link to="/challenges/new">
              <wds-button color="green">Create Challenge</wds-button>
            </Link>
          );
        }
        return null;
      }}
    </FirebaseAuth>
    <hr />
    <FirestoreCollection path={'challenges'} sort="_likeCount:desc">
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <p>No challenges yet!</p>;
        }

        return (
          <div>
            {data.map(challenge => (
              <div key={challenge.id}>
                <InternalLink to={`/${challenge.slug}`}>
                  {challenge.title}
                </InternalLink>
                <p>
                  {challenge._likeCount || 0}{' '}
                  {challenge._likeCount && challenge._likeCount === 1
                    ? 'like'
                    : 'likes'}
                </p>
              </div>
            ))}
          </div>
        );
      }}
    </FirestoreCollection>

    <hr />
  </Page>
);

export default ChallengeList;
