const admin = require('firebase-admin');

const admins = require('./admin.json');

exports.isAdmin = async user => {
  // Check if user meets role criteria.
  if (user.email && admins.includes(user.email)) {
    const customClaims = {
      admin: true,
      accessLevel: 9
    };
    // Set custom user claims on this newly created user.
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    // Update real-time database to notify client to force refresh.
    const metadataRef = admin.database().ref(`metadata/${user.uid}`);
    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh.
    return metadataRef.set({ refreshTime: new Date().getTime() });
  }
  return false;
};
