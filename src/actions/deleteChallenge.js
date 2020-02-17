import Firebase from 'firebase/app';

const deleteAttempt = challenge => {
  return Firebase.firestore()
    .collection('challenges')
    .doc(challenge.id)
    .delete()
    .catch(error => {
      // eslint-disable-next-line no-alert
      alert(`Whoops, couldn't delete the post: ${error.message}`);
    });
};

export default deleteAttempt;
