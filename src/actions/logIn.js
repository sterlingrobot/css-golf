import Firebase from 'firebase/app';

import { setPresence } from './presence';

const logIn = () => {
  const provider = new Firebase.auth.GithubAuthProvider();

  return Firebase.auth()
    .signInWithRedirect(provider)
    .then(result => {
      setPresence();
      console.log(`logged in as ${result.user.displayName}`);
    })
    .catch(error => {
      console.error('could not sign in', error);
    });
};

export default logIn;
