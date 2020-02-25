import React from 'react';
import PropTypes from 'prop-types';

import { ProfilePhoto, ProfileImage, ProfileIcon } from '../../styles/profile';

export const Avatar = ({ user, width }) => (
  <ProfilePhoto style={{ width }}>
    {user.photoURL ? (
      <ProfileImage src={user.photoURL} alt={user.displayName} />
    ) : (
      <wds-icon style={ProfileIcon}>person</wds-icon>
    )}
  </ProfilePhoto>
);

Avatar.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string
  }),
  width: PropTypes.string
};
