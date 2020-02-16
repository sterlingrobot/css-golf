import Firebase from 'firebase/app'

import { prepareDocForCreate } from './helpers/firestoreHelpers'

const createAttempt = values => {

  values.slug = slugify(values.title, {lower: true})
  values._likeCount = 0

  return Firebase.firestore()
    .collection('attempts')
    .add(prepareDocForCreate(values))
    .then( () => values)
    .catch( error => {
      alert(`Whoops, couldn't save your attempt: ${error.message}`)
    })
}

export default createAttempt
