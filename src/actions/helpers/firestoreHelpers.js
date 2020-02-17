// Helper functions for working with Firebase Firestore

import Firebase from 'firebase/app';
import 'firebase/auth';

const prepareDocForCreate = doc => {
  // timestamps
  const createdBy = Firebase.auth().currentUser
    ? Firebase.auth().currentUser.uid
    : null;
  const createdOn = Firebase.firestore.Timestamp.now();

  return { ...doc, createdBy, createdOn };
};

const prepareDocForUpdate = doc => {
  const update = {};

  // timestamps
  update.updatedBy = Firebase.auth().currentUser
    ? Firebase.auth().currentUser.uid
    : null;
  update.updatedOn = Firebase.firestore.Timestamp.now();

  // don't save the id as part of the document
  // don't save values that start with an underscore (these are calculated by the backend)
  Object.keys(doc).forEach(key => {
    if (key.indexOf('_') !== 0 && key !== 'id') {
      update[key] = doc[key];
    }
  });

  return update;
};

export { prepareDocForCreate, prepareDocForUpdate };
