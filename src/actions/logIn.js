import Firebase from 'firebase/app'

const logIn = () => {

  let provider = new Firebase.auth.GithubAuthProvider()
  
  return Firebase.auth()
    .signInWithRedirect(provider)
    .then( result => {
      console.log(`logged in as ${result.user.displayName}`)
    }).catch( error => {
      console.error('could not sign in', error)
    })
}

export default logIn
