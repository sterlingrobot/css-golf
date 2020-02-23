import Firebase from 'firebase/app';

import { compileScss } from './compileScss';
import { prepareDocForCreate } from './helpers/firestoreHelpers';

const createAttempt = async (challengeId, values) => {
  const _likeCount = 0;

  const attempt = { ...values, challenge: challengeId, _likeCount };
  attempt.style = await compileScss('attempt', challengeId, attempt.css);

  return Firebase.firestore()
    .collection('attempts')
    .add(prepareDocForCreate(attempt))
    .then(data => ({ path: data.path, ...attempt }))
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't save your attempt: ${error.message}`);
    });
};

export default createAttempt;
