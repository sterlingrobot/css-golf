import Firebase from 'firebase/app'
import { prepareDocForUpdate } from './helpers/firestoreHelpers'

const updateAttempt = (attemptId, values) => {

  return Firebase.firestore()
    .collection('attempt')
    .doc(attemptId)
    .update(prepareDocForUpdate(values))
    .catch( error => {
      alert(`Whoops, couldn't edit your attempt: ${error.message}`)
    })
}

export default updateAttempt
