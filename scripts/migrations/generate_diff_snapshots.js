/* eslint-disable no-console */
const admin = require('firebase-admin');
const Promise = require('bluebird');
const chalk = require('chalk');

import diffAttemptSnapshot from '../../src/actions/diffAttemptSnapshot';

admin.initializeApp();
const db = admin.firestore();

const getChallenge = id =>
  db
    .collection('challenges')
    .doc(id)
    .get();

const challenges = {};

const update = attempt => {
  console.log(`   Migrating attempt ${attempt.id}...`);

  challenges[attempt.data().challenge] =
    challenges[attempt.data().challenge] ||
    getChallenge(attempt.data().challenge);

  return Promise.all([
    db
      .collection('attempts')
      .doc(attempt.id)
      .get(),
    challenges[attempt.data().challenge]
  ])
    .then(([attempt, challenge]) =>
      diffAttemptSnapshot(challenge.data().snapshot, attempt.data().snapshot, {
        threshold: 0.5
      })
    )
    .then(diff => {
      // TODO: not working - canvas throws a fatal error on generateDiffData ?!
      // attempt.update({ diff });
      // console.log(chalk.green(`✔ Attempt ${attempt.id} diff snapshot saved.`));
      console.log(
        chalk.green(
          `✔ Attempt ${attempt.id} diff = ${diff.diffPixels}/${diff.totalPixels}`
        )
      );
    })
    .catch(error => {
      console.log(chalk.red(`⚠️ Migration error: `), error);
      process.exit(1);
    });
};

console.log(chalk.blue(`\nGenerating diff snapshots...`));

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
  .then(() => {
    console.log(chalk.green(`✔ All diff snapshots done!`));
    process.exit(0);
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ Migration error: `), error);
    process.exit(1);
  });
