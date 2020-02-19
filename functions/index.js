const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const getUserRole = require('./lib/getUserRole');
const challengeLikes = require('./lib/challengeLikes');

exports.setAccessPrivileges = functions.auth.onCreate(getUserRole.isAdmin);

exports.updatePostLikeCount = functions.firestore
  .document('challengeLikes/{challengeLikeId}')
  .onWrite(challengeLikes.updateChallengeLikeCount);
