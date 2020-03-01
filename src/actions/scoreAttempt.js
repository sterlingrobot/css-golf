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

export const calculateEfficiency = efficiency => {
  const strippedTarget = efficiency.target.style
    .replace(`#challenge-${efficiency.target.id}`, '')
    .replace(/\s/g, '');
  const strippedMatch = efficiency.match.style
    .replace(`#attempt-${efficiency.match.id}`, '')
    .replace(/\s/g, '');
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

export const scoreTotal = (diff, lint, efficiency) => {
  let average = 0;

  const scores = [
    scoreDiff(diff),
    scoreLint(lint),
    scoreEfficiency(calculateEfficiency(efficiency))
  ].filter(num => !!num.score);

  const score =
    scores.reduce((acc, curr) => {
      const weight = WEIGHTS[curr.name];
      average += weight;
      acc += curr.score * weight;
      return acc;
    }, 0) / average;

  return {
    toNumber: places => score.toFixed(places),
    isComplete: () => score >= PAR_THRESHOLD
  };
};
