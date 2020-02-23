import Firebase from 'firebase/app';

import { compileScss } from './compileScss';
import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';

const createAttempt = async (challengeId, values) => {
  const _likeCount = 0;

  const attempt = { ...values, challenge: challengeId, _likeCount };

  const doc = attempt.path
    ? Firebase.firestore().doc(attempt.path)
    : await Firebase.firestore()
        .collection('attempts')
        .add(prepareDocForCreate(attempt))
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your attempt: ${error.message}`);
        });

  if (attempt.path) {
    await doc.update(prepareDocForUpdate(attempt));
  }

  return compileScss('attempt', doc.id, attempt.css)
    .then(styles => doc.update({ style: styles }))
    .then(() => Promise.resolve({ path: doc.path, ...attempt }))
    .catch(error => Promise.reject({ path: doc.path, error }));
};

export default createAttempt;
