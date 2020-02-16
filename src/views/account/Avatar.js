import React from 'react';

export const Avatar = user => (
  <div className="user-avatar">
    <img src={user.photoUrl} />
  </div>
);
