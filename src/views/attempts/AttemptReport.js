import React from 'react';
import PropTypes from 'prop-types';

import { weightedAmount } from '../../actions/scoreAttempt';

import { ReportTable } from '../../styles/report';
import '../../styles/report.scss';

const AttemptReport = ({ title, attempt }) => (
  <wds-panel className="attempt-report" title={title}>
    <div slot="header">
      <h2>{attempt.score.total}</h2>
    </div>
    <ReportTable>
      <thead></thead>
      <tbody>
        {attempt.diff && (
          <tr>
            <th>
              <h3>The Drive</h3>
              Pixel Diffing Result
              <small>Worth {weightedAmount('diff').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                <li>
                  {attempt.diff.totalPixels - attempt.diff.diffPixels} of{' '}
                  {attempt.diff.totalPixels} pixels matched
                </li>
              </ul>
            </td>
            <td className="score">{attempt.score.diff}</td>
          </tr>
        )}
        {attempt.lint && (
          <tr>
            <th>
              <h3>The Approach</h3>
              Linting Result
              <small>Worth {weightedAmount('lint').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                {attempt.lint.warnings.length ? (
                  attempt.lint.warnings.map((warning, i) => (
                    <li key={i}>{warning.text}</li>
                  ))
                ) : (
                  <li>
                    <i>No errors!</i>
                  </li>
                )}
              </ul>
            </td>
            <td className="score">{attempt.score.lint}</td>
          </tr>
        )}
        {attempt.efficiency && (
          <tr>
            <th>
              <h3>The Green</h3>
              Efficiency Result
              <small>Worth {weightedAmount('efficiency').toFixed(2)}%</small>
            </th>
            <td>
              <ul>
                <li>
                  {(() => {
                    const { target, match } = attempt.efficiency;
                    const charDiff = match - target;
                    return `${Math.abs(charDiff)} characters ${
                      charDiff >= 0 ? 'more' : 'less'
                    } than challenge`;
                  })()}
                </li>
              </ul>
            </td>
            <td className="score">{attempt.score.efficiency}</td>
          </tr>
        )}
      </tbody>
    </ReportTable>
  </wds-panel>
);

export default AttemptReport;

AttemptReport.propTypes = {
  title: PropTypes.string,
  attempt: PropTypes.shape({
    id: PropTypes.string,
    style: PropTypes.string,
    score: PropTypes.shape({
      diff: PropTypes.number,
      lint: PropTypes.number,
      efficiency: PropTypes.number,
      total: PropTypes.number
    }),
    diff: PropTypes.shape({
      totalPixels: PropTypes.number,
      diffPixels: PropTypes.number
    }),
    efficiency: PropTypes.shape({
      target: PropTypes.number,
      match: PropTypes.number
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
    })
  })
};
