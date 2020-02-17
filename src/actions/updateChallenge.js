import Firebase from 'firebase/app';
import { prepareDocForUpdate } from './helpers/firestoreHelpers';

const updateChallenge = (challengeId, values) => {
  return Firebase.firestore()
    .collection('challenges')
    .doc(challengeId)
    .update(prepareDocForUpdate(values))
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't edit your attempt: ${error.message}`);
    });
};

export default updateChallenge;
