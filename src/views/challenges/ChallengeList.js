import React from 'react';
import { Link } from 'react-router-dom';

import FirebaseAuth from '../misc/FirebaseAuth';
import { FirestoreCollection, FirestoreDocument } from 'react-firestore';

import likeChallenge from '../../actions/likeChallenge';

import Error from '../misc/Error';

import { InternalLink } from '../../styles/links';
import { Page } from '../../styles/layout';
import { Par } from '../../styles/score';
import DateFormat from '../misc/DateFormat';

const giveLike = (e, challenge) => {
  e.preventDefault();
  const target = e.currentTarget;
  if (!target.classList.contains('liked')) {
    likeChallenge(challenge);
    target.classList.add('liked');
    setTimeout(() => target.classList.remove('liked'), 2000);
  }
};

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
    <FirestoreCollection path={'challenges'}>
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
              <FirestoreDocument
                key={challenge.id}
                path={`users/${challenge.createdBy}`}
              >
                {({ error, _isLoading, data }) => {
                  if (error) {
                    return <Error error={error} />;
                  }

                  const creator = data && data.displayName ? data : null;

                  return (
                    <InternalLink
                      to={`/${challenge.slug}`}
                      className="list-item"
                    >
                      <div className="list-item-challenge" key={challenge.id}>
                        <div className="snapshot">
                          <img src={challenge.snapshot} alt={challenge.title} />
                        </div>
                      </div>
                      <div className="list-item-info">
                        {challenge.title}
                        <small>
                          {creator && `by ${creator.displayName} on `}
                          {challenge.updatedOn ? (
                            <DateFormat timestamp={challenge.updatedOn} />
                          ) : (
                            <DateFormat timestamp={challenge.createdOn} />
                          )}
                        </small>
                      </div>
                      <div className="list-item-icons">
                        <div className="list-item-par">
                          <Par>{challenge.par}</Par>
                        </div>
                        <div
                          className="list-item-likes"
                          onClick={e => giveLike(e, challenge)}
                        >
                          <span className="like-count">
                            {challenge._likeCount || 0}
                          </span>
                          <wds-icon>thumb_up_alt</wds-icon>
                        </div>
                      </div>
                    </InternalLink>
                  );
                }}
              </FirestoreDocument>
            ))}
          </div>
        );
      }}
    </FirestoreCollection>

    <hr />
  </Page>
);

export default ChallengeList;
