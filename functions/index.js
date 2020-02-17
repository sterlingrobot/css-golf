const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const challengeLikes = require('./lib/challengeLikes')

exports.updatePostLikeCount = functions
  .firestore
  .document('challengeLikes/{challengeLikeId}')
  .onWrite(challengeLikes.updateChallengeLikeCount)
