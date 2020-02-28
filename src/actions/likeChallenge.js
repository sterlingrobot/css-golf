import Firebase from 'firebase/app';

import { prepareDocForCreate } from './helpers/firestoreHelpers';

const likeChallenge = challenge => {
  const like = prepareDocForCreate({
    challenge: challenge.id
  });

  return Firebase.firestore()
    .collection('challenge-likes')
    .add(like);
};

export default likeChallenge;
