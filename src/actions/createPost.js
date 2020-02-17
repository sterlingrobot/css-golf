import Firebase from 'firebase/app';
import slugify from 'slugify';

import { prepareDocForCreate } from './helpers/firestoreHelpers';

const createPost = values => {
  const slug = slugify(values.title, { lower: true });
  const _likeCount = 0;

  const post = { ...values, slug, _likeCount };

  return Firebase.firestore()
    .collection('posts')
    .add(prepareDocForCreate(post))
    .then(() => post)
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't create the post: ${error.message}`);
    });
};

export default createPost;
