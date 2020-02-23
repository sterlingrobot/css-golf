import Firebase from 'firebase/app';

import { compileScss } from './compileScss';
import { prepareDocForCreate } from './helpers/firestoreHelpers';

const createAttempt = async (challengeId, values) => {
  const _likeCount = 0;

  const attempt = { ...values, challenge: challengeId, _likeCount };

  const doc = await Firebase.firestore()
    .collection('attempts')
    .add(prepareDocForCreate(attempt))
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't save your attempt: ${error.message}`);
    });

  return compileScss('attempt', doc.id, attempt.css)
    .then(styles => doc.update({ style: styles }))
    .then(() => Promise.resolve({ path: doc.path, ...attempt }))
    .catch(error => Promise.reject(error));
};

export default createAttempt;
