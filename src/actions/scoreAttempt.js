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

export const scoreDiff = diff => ({
  name: 'diff',
  score: diff && 100 - (diff.diffPixels / diff.totalPixels) * 100
});

export const scoreLint = lint => ({
  name: 'lint',
  score: lint && 100 - 10 * lint.warnings.length
});

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

export const scoreEfficiency = efficiency => ({
  name: 'efficiency',
  score:
    efficiency &&
    100 -
      ((efficiency.match.length - efficiency.target.length) /
        efficiency.target.length) *
        100
});

export const scoreTotal = (diff, lint, efficiency) => {
  const scores = [
    scoreDiff(diff),
    scoreLint(lint),
    scoreEfficiency(calculateEfficiency(efficiency))
  ].filter(num => !!num.score);
  let average = 0;
  return (
    scores.reduce((acc, curr) => {
      const weight = WEIGHTS[curr.name];
      average += weight;
      acc += curr.score * weight;
      return acc;
    }, 0) / average
  );
};
