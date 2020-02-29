import React from 'react';
import PropTypes from 'prop-types';

import { ReportTable } from '../../styles/report';

const AttemptReport = ({ title, diff, lint }) => (
  <wds-panel title={title}>
    <ReportTable>
      <thead>
        <tr>
          <th colSpan="2">&nbsp;</th>
          <th className="score">Score</th>
        </tr>
      </thead>
      <tbody>
        {diff && (
          <tr>
            <th>Pixel Diffing Result</th>
            <td>
              {diff.totalPixels - diff.diffPixels} of {diff.totalPixels} pixels
              matched
            </td>
            <td className="score">
              {(100 - (diff.diffPixels / diff.totalPixels) * 100).toFixed(2)}
            </td>
          </tr>
        )}
        {lint && (
          <tr>
            <th>Linting Result</th>
            <td>
              {lint.results.errored && <strong>Errors</strong>}
              {lint.results.warnings.length && (
                <ul>
                  {lint.results.warnings.map((warning, i) => (
                    <li key={i}>{warning.text}</li>
                  ))}
                </ul>
              )}
            </td>
            <td className="score">{100 - 10 * lint.results.warnings.length}</td>
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
    results: PropTypes.shape({
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
