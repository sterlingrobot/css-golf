import React from 'react';
import PropTypes from 'prop-types';

import { ReportTable } from '../../styles/report';
import '../../styles/report.scss';

const WEIGHTS = {
  diff: 6,
  lint: 3,
  efficiency: 1
};

const weightedAmount = name => {
  const weightTotal = Object.values(WEIGHTS).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return (WEIGHTS[name] / weightTotal) * 100;
};

const scoreDiff = diff => ({
  name: 'diff',
  score: diff && 100 - (diff.diffPixels / diff.totalPixels) * 100
});

const scoreLint = lint => ({
  name: 'lint',
  score: lint && 100 - 10 * lint.warnings.length
});

const scoreEfficiency = efficiency => ({
  name: 'efficiency',
  score:
    efficiency &&
    100 -
      ((efficiency.match.length - efficiency.target.length) /
        efficiency.target.length) *
        100
});

const scoreTotal = (diff, lint, efficiency) => {
  const scores = [
    scoreDiff(diff),
    scoreLint(lint),
    scoreEfficiency(efficiency)
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

const AttemptReport = ({ title, diff, lint, efficiency, children }) => (
  <wds-panel className="attempt-report" title={title}>
    <div slot="header">{children}</div>
    <ReportTable>
      <thead>
        <tr>
          <th className="score" colSpan="2">
            Score
          </th>
          <th className="score">
            {scoreTotal(diff, lint, efficiency).toFixed(2)}
          </th>
        </tr>
      </thead>
      <tbody>
        {diff && (
          <tr>
            <th>
              Pixel Diffing Result
              <small>Worth {weightedAmount('diff').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                <li>
                  {diff.totalPixels - diff.diffPixels} of {diff.totalPixels}{' '}
                  pixels matched
                </li>
              </ul>
            </td>
            <td className="score">{scoreDiff(diff).score.toFixed(2)}</td>
          </tr>
        )}
        {lint && (
          <tr>
            <th>
              Linting Result
              <small>Worth {weightedAmount('lint').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                {lint.warnings.length ? (
                  lint.warnings.map((warning, i) => (
                    <li key={i}>{warning.text}</li>
                  ))
                ) : (
                  <li>
                    <i>No errors!</i>
                  </li>
                )}
              </ul>
            </td>
            <td className="score">{scoreLint(lint).score.toFixed(2)}</td>
          </tr>
        )}
        {efficiency && (
          <tr>
            <th>
              Efficiency Result
              <small>Worth {weightedAmount('efficiency').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                <li>
                  {(() => {
                    const charDiff =
                      efficiency.match.length - efficiency.target.length;
                    return `${Math.abs(charDiff)} characters ${
                      charDiff >= 0 ? 'more' : 'less'
                    } than challenge`;
                  })()}
                </li>
              </ul>
            </td>
            <td className="score">
              {scoreEfficiency(efficiency).score.toFixed(2)}
            </td>
          </tr>
        )}
      </tbody>
    </ReportTable>
  </wds-panel>
);

export default AttemptReport;

AttemptReport.propTypes = {
  title: PropTypes.string,
  diff: PropTypes.shape({
    totalPixels: PropTypes.number,
    diffPixels: PropTypes.number
  }),
  lint: PropTypes.shape({
    errored: PropTypes.bool,
    warnings: PropTypes.arrayOf(
      PropTypes.shape({
        rule: PropTypes.string,
        severity: PropTypes.string,
        text: PropTypes.string
      })
    )
  }),
  efficiency: PropTypes.shape({
    target: PropTypes.string,
    match: PropTypes.string
  }),
  children: PropTypes.node
};
