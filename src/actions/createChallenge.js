import Firebase from 'firebase/app';
import slugify from 'slugify';

import { prepareDocForCreate } from './helpers/firestoreHelpers';

const createAttempt = values => {
  const slug = slugify(values.title, { lower: true });
  const _likeCount = 0;

  const challenge = { ...values, slug, _likeCount };

  return Firebase.firestore()
    .collection('challenges')
    .add(prepareDocForCreate(challenge))
    .then(() => challenge)
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't save your attempt: ${error.message}`);
    });
};

export default createAttempt;
