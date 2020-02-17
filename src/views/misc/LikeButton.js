import React from 'react';
import PropTypes from 'prop-types';
import { FirestoreCollection } from 'react-firestore';

import likeChallenge from '../../actions/likeChallenge';
import unlikeChallenge from '../../actions/unlikeChallenge';
import FirebaseAuth from './FirebaseAuth';

const LikeButton = ({ challenge }) => (
  <FirebaseAuth>
    {({ isLoading, error, auth }) => {
      if (!auth || isLoading || error) {
        return <wds-button disabled>Like</wds-button>;
      }

      return (
        <FirestoreCollection
          path={'challengeLikes'}
          filter={[
            ['challengeId', '==', challenge.id],
            ['createdBy', '==', auth.uid]
          ]}
        >
          {({ collectionError, collectionIsLoading, data }) => {
            if (collectionError || collectionIsLoading) {
              return <button disabled>like</button>;
            }

            const userLike = data[0];

            return (
              <wds-button
                type={userLike ? '' : 'dark'}
                onClick={() => {
                  if (userLike) {
                    unlikeChallenge(userLike);
                  } else {
                    likeChallenge(challenge);
                  }
                }}
              >
                {userLike ? 'Unlike' : 'Like'}
              </wds-button>
            );
          }}
        </FirestoreCollection>
      );
    }}
  </FirebaseAuth>
);

export default LikeButton;

LikeButton.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string
  })
};
