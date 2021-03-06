/* eslint-disable no-console */
const admin = require('firebase-admin');
const Promise = require('bluebird');
const chalk = require('chalk');

import {
  scoreTotal,
  calculateEfficiency,
  calculateUtility
} from '../../src/actions/scoreAttempt';

admin.initializeApp();

const db = admin.firestore();
const batch = db.batch();

const getChallenge = id =>
  db
    .collection('challenges')
    .doc(id)
    .get();

const challenges = {};

const update = async attempt => {
  console.log(`  Migrating attempt ${attempt.id}...`);

  challenges[attempt.data().challenge] =
    challenges[attempt.data().challenge] ||
    (await getChallenge(attempt.data().challenge));

  const ref = db.collection('attempts').doc(attempt.id);
  const challenge = challenges[attempt.data().challenge];

  const efficiencyCalc = calculateEfficiency(attempt.data(), challenge.data());
  const utilityCalc = calculateUtility(attempt.data(), challenge.data());
  const score = scoreTotal(attempt.data(), challenge.data());

  const attemptScore = {
    diff: score.diffScore.toNumber(2),
    lint: score.lintScore.toNumber(2),
    efficiency: score.efficiencyScore.toNumber(2),
    utility: score.utilityScore.toNumber(2),
    total: score.toNumber(2),
    par: score.toPar(),
    complete: score.isComplete()
  };

  return batch.update(ref, {
    efficiency: efficiencyCalc,
    utility: utilityCalc,
    score: attemptScore
  });
};

console.log(chalk.blue(`\nRe-scoring all attempts...`));

db.collection('attempts')
  .get()
  .then(snap => {
    return Promise.map(snap.docs, update, {
      concurrency: 5
    }).then(() => batch.commit());
  })
  .then(() => {
    console.log(chalk.green(`✔ All attempts done!`));
    process.exit(0);
  })
  .catch(error => {
    console.log(chalk.red(`⚠️ Migration error: `), error);
    process.exit(1);
  });
