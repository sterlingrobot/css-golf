import Firebase from 'firebase/app';

import slugify from 'slugify';
import compileScss from './compileScss';
import generateSnapshot from './generateSnapshot';

import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';

const saveChallenge = async values => {
  const challenge = { ...values };
  challenge.slug = slugify(values.title, { lower: true });

  const doc = challenge.path
    ? Firebase.firestore().doc(challenge.path)
    : await Firebase.firestore()
        .collection('challenges')
        .add(prepareDocForCreate({ ...challenge, _likeCount: 0 }))
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your challenge: ${error.message}`);
        });

  return compileScss('challenge', doc.id, challenge.css)
    .then(styles => {
      challenge.style = styles;
      return generateSnapshot(
        doc.id,
        'challenge',
        challenge.html,
        challenge.style
      );
    })
    .then(snapshot => {
      console.log(snapshot);
      return doc.update(
        prepareDocForUpdate({ ...challenge, snapshot, path: doc.path })
      );
    })
    .then(() => Promise.resolve({ ...challenge, path: doc.path }))
    .catch(error => Promise.reject({ error, path: doc.path }));
};

export default saveChallenge;
