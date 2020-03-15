const MAX_TRIES = 10;
const PAR_THRESHOLD = 90;

const WEIGHTS = {
  diff: 12,
  lint: 3,
  efficiency: 1,
  utility: 4
};

const toNumber = (num, places) =>
  +(Math.round(num + `e+${places}`) + `e-${places}`);

export const weightedAmount = name => {
  const weightTotal = Object.values(WEIGHTS).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return (WEIGHTS[name] / weightTotal) * 100;
};

export const scoreDiff = diff => {
  const score = diff && 100 - (diff.diffPixels / diff.totalPixels) * 100;
  return {
    name: 'diff',
    score,
    toNumber: places => toNumber(score, places)
  };
};

export const scoreLint = lint => {
  const score = lint && 100 - 10 * lint.warnings.length;
  return {
    name: 'lint',
    score,
    toNumber: places => toNumber(score, places)
  };
};

export const calculateEfficiency = (match, target) => {
  const strippedTarget =
    target && target.style
      ? target.style.replace(`#challenge-${target.id}`, '').replace(/\s/g, '')
      : '';
  const strippedMatch =
    match && match.style
      ? match.style.replace(`#attempt-${match.id}`, '').replace(/\s/g, '')
      : '';
  return {
    match: strippedMatch.length,
    target: strippedTarget.length
  };
};

export const scoreEfficiency = efficiency => {
  const score =
    efficiency && efficiency.match > 10
      ? 100 - ((efficiency.match - efficiency.target) / efficiency.target) * 100
      : 0;
  return {
    name: 'efficiency',
    score,
    toNumber: places => toNumber(score, places)
  };
};

export const calculateUtility = (attempt, challenge) => {
  let targetMatches = 0,
    matchMatches = 0;
  const VAR_REGEXP = /(var\(--|\$)[a-z]+/g;
  while (VAR_REGEXP.exec(challenge.css)) targetMatches++;
  while (VAR_REGEXP.exec(attempt.css)) matchMatches++;
  return {
    match: matchMatches,
    target: targetMatches
  };
};

export const scoreUtility = utility => {
  const score =
    utility && utility.target
      ? 100 - ((utility.target - utility.match) / utility.target) * 20
      : null;
  return {
    name: 'utility',
    score,
    toNumber: places => toNumber(score, places)
  };
};

export const scoreTotal = (attempt, challenge) => {
  let average = 0;

  const diffScore = scoreDiff(attempt.diff);
  const lintScore = scoreLint(attempt.lint);
  const efficiencyScore = scoreEfficiency(
    calculateEfficiency(attempt, challenge)
  );
  const utilityScore = scoreUtility(calculateUtility(attempt, challenge));

  const scores = [diffScore, lintScore, efficiencyScore, utilityScore].filter(
    num => !!num.score
  );

  const score =
    scores.reduce((acc, curr) => {
      const weight = WEIGHTS[curr.name];
      average += weight;
      acc += curr.score * weight;
      return acc;
    }, 0) / average;

  return {
    diffScore,
    lintScore,
    efficiencyScore,
    utilityScore,
    toNumber: (places = 0) => toNumber(score, places),
    isComplete: () => score >= PAR_THRESHOLD || attempt.tries >= MAX_TRIES,
    toPar: () => {
      const overUnder = attempt.tries - challenge.par;
      const sign = overUnder > 0 ? '+' : '';
      return score >= PAR_THRESHOLD || attempt.tries >= MAX_TRIES
        ? `${sign}${overUnder}`
        : 'INCOMPLETE';
    }
  };
};
