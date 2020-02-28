import Firebase from 'firebase/app';

import slugify from 'slugify';
import compileScss from './compileScss';
import domtoimage from 'dom-to-image';

import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';

const saveChallenge = async (values, snapshotNode) => {
  const challenge = { ...values };

  challenge.slug = slugify(values.title, { lower: true });

  if (snapshotNode) {
    challenge.snapshot = await domtoimage.toPng(snapshotNode);
  }

  const doc = challenge.path
    ? Firebase.firestore().doc(challenge.path)
    : await Firebase.firestore()
        .collection('challenges')
        .add(prepareDocForCreate({ ...challenge, _likeCount: 0 }))
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your challenge: ${error.message}`);
        });

  if (challenge.path) {
    await doc.update(prepareDocForUpdate(challenge));
  }

  return compileScss('challenge', doc.id, challenge.css)
    .then(styles => doc.update({ style: styles, path: doc.path }))
    .then(() => Promise.resolve({ ...challenge, path: doc.path }))
    .catch(error => Promise.reject({ error, path: doc.path }));
};

export default saveChallenge;
