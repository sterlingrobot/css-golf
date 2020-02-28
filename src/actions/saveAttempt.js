import Firebase from 'firebase/app';

import compileScss from './compileScss';
import generateSnapshot from './generateSnapshot';

import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';

const saveAttempt = async (challengeId, values) => {
  const attempt = { ...values, challenge: challengeId };

  const challengeDoc = await Firebase.firestore()
    .collection('challenges')
    .doc(challengeId)
    .get();

  const challenge = challengeDoc.data();

  const doc = attempt.path
    ? Firebase.firestore().doc(attempt.path)
    : await Firebase.firestore()
        .collection('attempts')
        .add(prepareDocForCreate({ ...attempt, _likeCount: 0 }))
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your attempt: ${error.message}`);
        });

  return compileScss('attempt', doc.id, attempt.css)
    .then(styles => {
      attempt.style = styles;
      return generateSnapshot(doc.id, 'attempt', challenge.html, attempt.style);
    })
    .then(snapshot => {
      console.log(snapshot);
      return doc.update(
        prepareDocForUpdate({ ...attempt, snapshot, path: doc.path })
      );
    })
    .then(() => Promise.resolve({ ...attempt, path: doc.path }))
    .catch(error => Promise.reject({ error, path: doc.path }));
};

export default saveAttempt;
