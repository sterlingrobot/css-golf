import Firebase from 'firebase/app';

import compileScss from './compileScss';
import generateSnapshot from './generateSnapshot';
import lintStyles from './lintStyles';
import diffAttemptSnapshot from './diffAttemptSnapshot';

import {
  prepareDocForCreate,
  prepareDocForUpdate
} from './helpers/firestoreHelpers';
import { scoreTotal, scoreEfficiency, scoreUtility } from './scoreAttempt';

const saveAttempt = async (challengeId, values, record = false) => {
  const attempt = { ...values, challenge: challengeId };

  const challengeDoc = await Firebase.firestore()
    .collection('challenges')
    .doc(challengeId)
    .get();

  const challenge = challengeDoc.data();

  const doc = attempt.path
    ? Firebase.firestore().doc(attempt.path)
    : await Firebase.firestore()
        .collection('attempts')
        .add(
          prepareDocForCreate({
            ...attempt,
            tries: 0,
            _likeCount: 0
          })
        )
        .catch(error => {
          // eslint-disable-next-line no-alert
          alert(`Whoops, couldn't save your attempt: ${error.message}`);
        });

  const attemptDoc = await doc.get();
  const data = attemptDoc.data();

  attempt.tries = data.tries + (record ? 1 : 0);

  return lintStyles(attempt.css)
    .then(results => {
      attempt.lint = results;
      return compileScss('attempt', doc.id, attempt.css);
    })
    .then(styles => {
      attempt.style = styles;
      return generateSnapshot(doc.id, 'attempt', challenge.html, attempt.style);
    })
    .then(snapshot => {
      attempt.snapshot = snapshot;
      return diffAttemptSnapshot(challenge.snapshot, attempt.snapshot, {
        threshold: 0.5
      });
    })
    .then(diff => {
      attempt.diff = diff;
      attempt.efficiency = scoreEfficiency(attempt, challenge);
      attempt.utility = scoreUtility(attempt, challenge);
      const score = scoreTotal(attempt, challenge);
      attempt.score = {
        diff: score.diffScore.toNumber(2),
        lint: score.lintScore.toNumber(2),
        efficiency: score.efficiencyScore.toNumber(2),
        utility: score.utilityScore.toNumber(2),
        total: score.toNumber(2),
        par: score.toPar(),
        complete: score.isComplete()
      };
      return doc.update(prepareDocForUpdate({ ...attempt, path: doc.path }));
    })
    .then(() => Promise.resolve({ ...attempt, path: doc.path }))
    .catch(error => Promise.reject({ error, path: doc.path }));
};

export default saveAttempt;
