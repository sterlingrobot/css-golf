import Firebase from 'firebase/app';

import { compileScss } from './compileScss';
import domtoimage from 'dom-to-image';

import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';

const saveAttempt = async (challengeId, values, snapshotNode) => {
  const attempt = { ...values, challenge: challengeId };

  if (snapshotNode) {
    attempt.snapshot = await domtoimage.toPng(snapshotNode);
  }

  console.log(attempt.path, !!attempt.path);

  const doc = attempt.path
    ? Firebase.firestore().doc(attempt.path)
    : await Firebase.firestore()
        .collection('attempts')
        .add(prepareDocForCreate({ ...attempt, _likeCount: 0 }))
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your attempt: ${error.message}`);
        });

  if (attempt.path) {
    await doc.update(prepareDocForUpdate(attempt));
  }

  return compileScss('attempt', doc.id, attempt.css)
    .then(styles => doc.update({ style: styles, path: doc.path }))
    .then(() => Promise.resolve({ ...attempt, path: doc.path }))
    .catch(error => Promise.reject({ error, path: doc.path }));
};

export default saveAttempt;
