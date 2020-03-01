import React from 'react';
import PropTypes from 'prop-types';

import {
  weightedAmount,
  calculateEfficiency,
  scoreDiff,
  scoreLint,
  scoreEfficiency,
  scoreTotal
} from '../../actions/scoreAttempt';

import { ReportTable } from '../../styles/report';
import '../../styles/report.scss';

const AttemptReport = ({ title, diff, lint, efficiency }) => (
  <wds-panel className="attempt-report" title={title}>
    <div slot="header">
      <h2>{scoreTotal(diff, lint, efficiency).toNumber(2)}</h2>
    </div>
    <ReportTable>
      <thead></thead>
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
            <td className="score">{scoreDiff(diff).toNumber(2)}</td>
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
            <td className="score">{scoreLint(lint).toNumber(2)}</td>
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
                    const { target, match } = calculateEfficiency(efficiency);
                    const charDiff = match.length - target.length;
                    return `${Math.abs(charDiff)} characters ${
                      charDiff >= 0 ? 'more' : 'less'
                    } than challenge`;
                  })()}
                </li>
              </ul>
            </td>
            <td className="score">
              {scoreEfficiency(calculateEfficiency(efficiency)).toNumber(2)}
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
    target: PropTypes.shape({
      id: PropTypes.string,
      style: PropTypes.string
    }),
    match: PropTypes.shape({
      id: PropTypes.string,
      style: PropTypes.string
    })
  })
};
