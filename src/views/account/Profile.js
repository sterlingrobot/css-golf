import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import logOut from '../../actions/logOut';
import { Avatar } from './Avatar';

const Profile = ({ auth }) => (
  <Route
    render={({ history }) => (
      <div className="profile">
        <div style={{ marginRight: '2rem' }}>
          <Avatar user={auth} width="10rem" />
        </div>
        <div className="profile-info">
          <strong>{auth.displayName}</strong>
          <p>{auth.email}</p>
          <wds-button
            color="red"
            onClick={() => logOut().then(() => history.push(`/`))}
          >
            Sign out
          </wds-button>
        </div>
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
