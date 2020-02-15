const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const postLikes = require('./lib/postLikes')
const subscriptions = require('./lib/subscriptions')

exports.updateStripeSubscription = functions
  .firestore
  .document('subscriptions/{subscriptionId}')
  .onWrite(subscriptions.updateStripeSubscription)

exports.updatePostLikeCount = functions
  .firestore
  .document('postLikes/{postLikeId}')
  .onWrite(postLikes.updatePostLikeCount)