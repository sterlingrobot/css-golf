// wrapper for Firebase Authentication
// similar API to react-firestore, but instead of returning a collection or document,
// it returns the logged in user (or null if not logged in) along with loading state and errors

import React from 'react';
import PropTypes from 'prop-types';

import Firebase from 'firebase/app';

class FirebaseAuth extends React.Component {
  state = {
    isLoading: true,
    error: null,
    auth: null
  };

  componentDidMount() {
    this.unsubscribe = Firebase.auth().onAuthStateChanged(
      this.handleAuth,
      this.handleError
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleAuth = auth => {
    this.setState({
      isLoading: false,
      auth,
      error: null
    });
  };

  handleError = error => {
    this.setState({
      isLoading: false,
      auth: null,
      error
    });
  };

  render() {
    return this.props.children(this.state);
  }
}

export default FirebaseAuth;

FirebaseAuth.propTypes = {
  children: PropTypes.any
};
