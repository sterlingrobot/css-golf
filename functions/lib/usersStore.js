const admin = require('firebase-admin');

exports.addUser = async user => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      photoUrl: user.photoUrl
    });
};
