import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import logOut from '../../actions/logOut';
import { Avatar } from './Avatar';

const Profile = ({ auth }) => (
  <Route
    render={({ history }) => (
      <div>
        <Avatar user={auth} width="10rem" />
        <p>
          <strong>{auth.displayName}</strong>
        </p>
        <p>{auth.email}</p>
        <wds-button
          color="red"
          onClick={() => logOut().then(() => history.push(`/`))}
        >
          Log out
        </wds-button>
      </div>
    )}
  />
);

export default Profile;

Profile.propTypes = {
  auth: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string
  })
};
