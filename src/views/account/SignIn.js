import React from 'react';

import Firebase from 'firebase/app';

import { Github, Google } from '@icons-pack/react-simple-icons';
import { Colors } from '@wisetail/tokens';

import logIn from '../../actions/logIn';

import '../../styles/login.scss';

const githubProvider = new Firebase.auth.GithubAuthProvider();
const googleProvider = new Firebase.auth.GoogleAuthProvider();

const SignIn = () => (
  <div className="signin-container">
    <div className="github">
      <wds-button onClick={() => logIn(githubProvider)}>
        <Github className="icon" color={Colors.BLACK_BASE} size={18} />
        Sign in with Github
      </wds-button>
    </div>

    <div className="google">
      <wds-button onClick={() => logIn(googleProvider)}>
        <Google className="icon google" color={Colors.BLACK_BASE} size={18} />
        Sign in with Google
      </wds-button>
    </div>
  </div>
);

export default SignIn;
