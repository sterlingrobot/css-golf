const MAX_TRIES = 10;
const PAR_THRESHOLD = 90;

const WEIGHTS = {
  diff: 6,
  lint: 3,
  efficiency: 1
};

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
    toNumber: places => score.toFixed(places)
  };
};

export const scoreLint = lint => {
  const score = lint && 100 - 10 * lint.warnings.length;
  return {
    name: 'lint',
    score,
    toNumber: places => score.toFixed(places)
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
    target: strippedTarget,
    match: strippedMatch
  };
};

export const scoreEfficiency = efficiency => {
  const score =
    efficiency &&
    100 -
      ((efficiency.match.length - efficiency.target.length) /
        efficiency.target.length) *
        100;
  return {
    name: 'efficiency',
    score,
    toNumber: places => score.toFixed(places)
  };
};

export const scoreTotal = (attempt, challenge) => {
  let average = 0;

  const scores = [
    scoreDiff(attempt.diff),
    scoreLint(attempt.lint),
    scoreEfficiency(calculateEfficiency(attempt, challenge))
  ].filter(num => !!num.score);

  const score =
    scores.reduce((acc, curr) => {
      const weight = WEIGHTS[curr.name];
      average += weight;
      acc += curr.score * weight;
      return acc;
    }, 0) / average;

  return {
    toNumber: (places = 0) => score.toFixed(places),
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
