const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const postLikes = require('./lib/postLikes')

exports.updatePostLikeCount = functions
  .firestore
  .document('postLikes/{postLikeId}')
  .onWrite(postLikes.updatePostLikeCount)