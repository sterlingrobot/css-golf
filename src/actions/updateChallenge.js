import Firebase from 'firebase/app';
import domtoimage from 'dom-to-image';

import { compileScss } from './compileScss';
import { prepareDocForUpdate } from './helpers/firestoreHelpers';

const updateChallenge = async (challengeId, values, snapshotNode) => {
  const challenge = { ...values };

  challenge.style = await compileScss('challenge', challengeId, challenge.css);

  challenge.snapshot = await domtoimage.toPng(snapshotNode);

  return Firebase.firestore()
    .collection('challenges')
    .doc(challengeId)
    .update(prepareDocForUpdate(challenge))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Couldn't edit challenge: ${error.message}`);
    });
};

export default updateChallenge;
