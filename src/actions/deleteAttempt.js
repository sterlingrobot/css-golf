import Firebase from 'firebase/app'

const deleteAttempt = attempt => {

  return Firebase.firestore()
    .collection('attempts')
    .doc(attempt.id)
    .delete()
    .catch( error => {
      alert(`Whoops, couldn't delete the post: ${error.message}`)
    })
}

export default deleteAttempt
