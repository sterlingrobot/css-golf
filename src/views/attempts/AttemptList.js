import React from 'react';
import PropTypes from 'prop-types';

import { FirestoreCollection, FirestoreDocument } from 'react-firestore';
import { scoreTotal } from '../../actions/scoreAttempt';

import DateFormat from '../misc/DateFormat';
import Error from '../misc/Error';

import { InternalLink } from '../../styles/links';
import { Avatar } from '../account/Avatar';

import '../../styles/attempt.scss';

const AttemptList = ({ challenge = null, user = null }) => (
  <div className="attempts-list">
    <h3>Recent Attempts</h3>
    <FirestoreCollection
      path={'attempts'}
      filter={
        user ? ['createdBy', '==', user.uid] : ['challenge', '==', challenge.id]
      }
      sort="createdOn:desc"
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <p>No attempts yet!</p>;
        }

        return (
          <>
            {data.map(attempt => (
              <div key={attempt.id}>
                <FirestoreDocument path={`users/${attempt.createdBy}`}>
                  {({ error, isLoading, data }) => {
                    if (error) {
                      return <Error error={error} />;
                    }

                    if (isLoading) {
                      return <p>loading...</p>;
                    }

                    if (!data) {
                      return <Error />;
                    }

                    const attemptUser = data;

                    return (
                      <FirestoreDocument
                        path={`challenges/${attempt.challenge}`}
                      >
                        {({ error, isLoading, data }) => {
                          if (error) {
                            return <Error error={error} />;
                          }

                          if (isLoading) {
                            return <p>loading...</p>;
                          }

                          if (!data) {
                            return <Error />;
                          }

                          const attemptChallenge = data;

                          return (
                            <InternalLink
                              to={`/attempts/${attempt.id}`}
                              className="list-item"
                            >
                              {challenge ? (
                                <>
                                  <div className="list-item-avatar">
                                    <Avatar user={attemptUser} width="2.5em" />
                                  </div>
                                  <div className="list-item-info">
                                    by{' '}
                                    {attemptUser.displayName || 'Somebody Else'}
                                    <small>
                                      {attempt.updatedOn ? (
                                        <DateFormat
                                          timestamp={attempt.updatedOn}
                                        />
                                      ) : (
                                        <DateFormat
                                          timestamp={attempt.createdOn}
                                        />
                                      )}
                                    </small>
                                  </div>
                                  <div className="list-item-icons"></div>
                                  <div className="list-item-score">
                                    {scoreTotal(attempt.diff, attempt.lint, {
                                      target: attemptChallenge,
                                      match: attempt
                                    }).toFixed(2)}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="list-item-challenge">
                                    <div className="snapshot">
                                      <img
                                        src={attemptChallenge.snapshot}
                                        alt={attemptChallenge.title}
                                      />
                                    </div>
                                  </div>
                                  <div className="list-item-info">
                                    {attemptChallenge.title}
                                    <small>
                                      {attempt.updatedOn ? (
                                        <DateFormat
                                          timestamp={attempt.updatedOn}
                                        />
                                      ) : (
                                        <DateFormat
                                          timestamp={attempt.createdOn}
                                        />
                                      )}
                                    </small>
                                  </div>
                                  <div className="list-item-icons"></div>
                                  <div className="list-item-score">
                                    {scoreTotal(attempt.diff, attempt.lint, {
                                      target: attemptChallenge,
                                      match: attempt
                                    }).toFixed(2)}
                                  </div>
                                </>
                              )}
                            </InternalLink>
                          );
                        }}
                      </FirestoreDocument>
                    );
                  }}
                </FirestoreDocument>
              </div>
            ))}
          </>
        );
      }}
    </FirestoreCollection>
  </div>
);

export default AttemptList;

AttemptList.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string
  }),
  user: PropTypes.shape({
    id: PropTypes.string
  })
};
