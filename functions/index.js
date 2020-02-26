const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const usersStore = require('./lib/usersStore');
const getUserRole = require('./lib/getUserRole');
const challengeLikes = require('./lib/challengeLikes');

exports.addUser = functions.auth.user().onCreate(usersStore.addUser);

exports.setAccessPrivileges = functions.auth
  .user()
  .onCreate(getUserRole.isAdmin);

exports.updateChallengeLikeCount = functions.firestore
  .document('challenge-likes/{challengeLikeId}')
  .onWrite(challengeLikes.updateChallengeLikeCount);
