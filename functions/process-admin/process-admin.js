const querystring = require('querystring');
const admin = require('firebase-admin');

const admins = require('./admin.json');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://css-golf-dev.firebaseio.com'
});

// On sign up.
exports.handler = async (event, _context) => {
  const { user } = querystring.parse(event.body);
  // Check if user meets role criteria.
  if (user.email && user.emailVerified && admins.includes(user.email)) {
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
    metadataRef.set({ refreshTime: new Date().getTime() });

    return {
      statusCode: 200,
      body: JSON.stringify({ user })
    };
  }

  return {
    statusCode: 403,
    body: JSON.stringify({ message: `Unauthorized` })
  };
};
