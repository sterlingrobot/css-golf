import React from 'react';
import PropTypes from 'prop-types';

import {
  ProfilePhoto,
  ProfileImage
} from '../../styles/profile'

export const Avatar = ({ user, width }) => (
  <ProfilePhoto
    style={{ width }}
  >
    <ProfileImage src={user.photoURL} alt={user.displayName} />
  </ProfilePhoto>
);

Avatar.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string
  }),
  width: PropTypes.string
}
