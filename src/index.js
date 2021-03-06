/* eslint-disable no-console */
// the main file in our front-end app
// create-react-app expects a file in src/index.js and loads everything from here

import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './views/App';

import '@wisetail/wds-button';
import '@wisetail/wds-panel';

import '@wisetail/tokens/build/css/fonts.css';
import '@wisetail/tokens/build/css/variables.css';
import './styles/global.scss';

require('dotenv').config();

console.log('create-react-app env:', process.env.NODE_ENV);
console.log('firebase project env:', process.env.REACT_APP_ENV);

// connect our app to firebase
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

Firebase.initializeApp(dbConfig);

Firebase.firestore().settings({
  cacheSizeBytes: Firebase.firestore.CACHE_SIZE_UNLIMITED
});

Firebase.firestore().enablePersistence();

// render the App component to our document root with React
ReactDOM.render(<App />, document.getElementById('root'));
