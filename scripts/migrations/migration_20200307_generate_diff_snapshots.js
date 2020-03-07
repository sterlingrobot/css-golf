/* eslint-disable no-console */
const admin = require('firebase-admin');
const Promise = require('bluebird');
const chalk = require('chalk');

const diffAttemptSnapshot = require('../../src/actions/diffAttemptSnapshot');

admin.initializeApp();

const db = admin.firestore();

const getChallenge = id =>
  db
    .collection('challenges')
    .doc(id)
    .get();

const update = async attempt => {
  console.log(`  migrating attempt ${attempt.id}...`);

  const challenge = await getChallenge(attempt.challenge);

  console.log(chalk.green(`✅ got ${challenge.slug}`));

  return db
    .collection('attempts')
    .doc(attempt.id)
    .get();
  // .update({
  //   diff: { ...attempt.data().diff, snapshot }
  // });
};

console.log(chalk.blue(`Doing the thing...`));

// if you're collection is big, you might want to paginate the query
// so you don't download the entire thing at once:
// https://firebase.google.com/docs/firestore/query-data/query-cursors
db.collection('attempts')
  .get()
  .then(snap => {
    // Bluebird Promises lets you limit promises running at once:
    // http://bluebirdjs.com/docs/api/promise.map.html
    return Promise.map(snap.docs, update, { concurrency: 5 });
  })
  .then(attempt => {
    console.log(chalk.green(`✅ ${attempt.id} done!`));
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ migration error: `), error);
  });
