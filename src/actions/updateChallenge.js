import Firebase from 'firebase/app';

import { compileScss } from './compileScss';
import { prepareDocForUpdate } from './helpers/firestoreHelpers';

const updateChallenge = async (challengeId, values) => {
  const challenge = { ...values };

  challenge.style = await compileScss(challengeId, challenge.css);

  return Firebase.firestore()
    .collection('challenges')
    .doc(challengeId)
    .update(prepareDocForUpdate(challenge))
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't edit your attempt: ${error.message}`);
    });
};

export default updateChallenge;
