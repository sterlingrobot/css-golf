import Firebase from 'firebase/app';
import domtoimage from 'dom-to-image';

import { prepareDocForUpdate } from './helpers/firestoreHelpers';

const snapshotAttempt = async (attemptId, snapshotNode) => {
  const snapshot = await domtoimage.toPng(snapshotNode);

  return Firebase.firestore()
    .collection('attempts')
    .doc(attemptId)
    .update(prepareDocForUpdate({ snapshot }))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Couldn't edit attempt: ${error.message}`);
    });
};

export default snapshotAttempt;
