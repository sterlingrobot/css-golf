const admin = require('firebase-admin');

const getNumberOfChallengeLikes = challengeId => {
  return admin
    .firestore()
    .collection('challenge-likes')
    .where('challenge', '==', challengeId)
    .get()
    .then(snapshot => snapshot.size);
};

const setChallengeLikeCount = (challengeId, count) => {
  return admin
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .update({
      _likeCount: count
    });
};

// update _likeCount on a challenge when it's liked or unliked
exports.updateChallengeLikeCount = (change, _context) => {
  const challengeId = change.after.exists
    ? change.after.data().challenge
    : change.before.data().challenge;
  return getNumberOfChallengeLikes(challengeId).then(count =>
    setChallengeLikeCount(challengeId, count)
  );
};
