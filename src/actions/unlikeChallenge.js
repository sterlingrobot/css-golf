import Firebase from 'firebase/app'

const unlikeChallenge = userLike => {

  return Firebase.firestore()
    .collection('challengeLikes')
    .doc(userLike.id)
    .delete()
}

export default unlikeChallenge
