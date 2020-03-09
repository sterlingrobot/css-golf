// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';
import Markdown from 'markdown-to-jsx';

import Prism from 'prismjs';
import 'prismjs/components/prism-scss';
import prettier from 'prettier/standalone';
import parserPostcss from 'prettier/parser-postcss';
import prettierConfig from '../../styles/prettierConfig';

import AttemptMarkup from './AttemptMarkup';
import ChallengeMarkup from '../challenges/ChallengeMarkup';

import Modal from '../misc/Modal';
import SCSSvariables from '../misc/SCSSvariables';
import CSSvariables from '../misc/CSSvariables';
import Error from '../misc/Error';

import { FormRow } from '../../styles/forms';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/form.scss';
import '../../styles/editor.scss';
import '../../styles/output';

class AttemptForm extends React.Component {
  state = {
    code: this.props.attempt ? this.props.attempt.css : ''
  };

  onSubmit = event => {
    event.preventDefault();
    const target = event.target;
    this.props.onSave && this.props.onSave(true);
    this.setState(
      {
        code: this.formatCode()
      },
      () => {
        const { css, path } = target.elements;
        const values = {
          path: path.value,
          css: css.value
        };
        return css.checkValidity() && this.props.onSubmit(values, true);
      }
    );
  };

  formatCode = () => {
    const { code } = this.state;
    const formatted = prettier.format(code, {
      ...prettierConfig,
      plugins: [parserPostcss],
      parser: 'scss'
    });
    return formatted;
  };

  render() {
    const { path, attempt, challenge, isSaving, error, onClick } = this.props;
    const isComplete = attempt && attempt.score && attempt.score.complete;
    return (
      <form id="attemptForm" onSubmit={this.onSubmit}>
        <input
          type="hidden"
          name="path"
          defaultValue={(attempt && attempt.path) || path}
        />
        <div className="form-wrap">
          {!isComplete ? (
            <div className="attempt-help">
              {challenge.hints &&
                challenge.hints.map((hint, i) => (
                  <Modal
                    key={i}
                    trigger={{
                      icon: 'lightbulb_outline',
                      label: `Hint #${i + 1}`
                    }}
                    title={`Hint #${i + 1}`}
                  >
                    <Markdown style={{ minWidth: '40em' }}>{hint}</Markdown>
                  </Modal>
                ))}

              <Modal
                trigger={{ icon: 'info_outline', label: 'SCSS' }}
                title="SCSS Variables"
              >
                <SCSSvariables />
              </Modal>
              <Modal
                trigger={{ icon: 'info_outline', label: 'CSS' }}
                title="CSS Variables"
              >
                <CSSvariables />
              </Modal>
            </div>
          ) : null}

          <FormRow className="form-row">
            <ChallengeMarkup html={challenge.html} />
            {isComplete ? (
              <AttemptMarkup css={attempt.css} />
            ) : (
              <div className="editor-wrap">
                <Editor
                  className="editor"
                  name="css"
                  value={this.state.code}
                  placeholder="... you can write SCSS here ..."
                  onValueChange={code => this.setState({ code })}
                  highlight={code =>
                    Prism.highlight(code, Prism.languages.scss)
                  }
                  padding={10}
                  style={{ ...editor }}
                  required
                />
              </div>
            )}
            {error && error.message ? (
              <Error error={error} />
            ) : error ? (
              <div className="editor-error">
                <wds-icon type="warn" onClick={onClick}>
                  close
                </wds-icon>
                {error}
              </div>
            ) : null}
          </FormRow>

          <FormRow>
            <button
              type="submit"
              disabled={isSaving || isComplete}
              style={{
                width: '100%',
                appearance: 'none',
                border: 0,
                background: 'none'
              }}
            >
              <wds-button
                type={isSaving || isComplete ? '' : 'dark'}
                color={isComplete ? 'green' : ''}
              >
                {isSaving
                  ? `Submitting...`
                  : isComplete
                  ? `Completed!`
                  : `Submit Try #${attempt ? attempt.tries + 1 : 1}`}
              </wds-button>
            </button>
          </FormRow>
        </div>
      </form>
    );
  }
}

export default AttemptForm;

AttemptForm.propTypes = {
  path: PropTypes.string,
  attempt: PropTypes.shape({
    path: PropTypes.string,
    tries: PropTypes.number,
    css: PropTypes.string,
    score: PropTypes.shape({
      complete: PropTypes.bool
    })
  }),
  challenge: PropTypes.shape({
    html: PropTypes.string,
    hints: PropTypes.arrayOf(PropTypes.string)
  }),
  isSaving: PropTypes.bool,
  isComplete: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Error)]),
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  onSave: PropTypes.func
};
